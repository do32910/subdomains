from flask import Flask, jsonify, json, request
from flask.views import MethodView
from flask_sslify import SSLify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)
from flask_restful import Resource, Api
from sqlalchemy import text
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import boto3
from credentials import *
'''
imported variables:
aws_access_key_id
aws_secret_access_key
db_uri
jwt_key
'''
client = boto3.client(
            'route53',
            aws_access_key_id=aws_access_key_id,
            aws_secret_access_key=aws_secret_access_key
 )

application = Flask(__name__)
sslify = SSLify(application)
jwt = JWTManager(application)
limiter = Limiter(
    application,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)


application.config['SQLALCHEMY_DATABASE_URI'] = db_uri
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
application.config['JWT_SECRET_KEY'] = jwt_key
db = SQLAlchemy(application)

#################
### db models ###
#################

class Users(db.Model):
    __tablename_ = 'users'
    id = db.Column('id', db.Integer, primary_key=True)
    login = db.Column('login', db.Unicode)
    password = db.Column('password', db.Unicode)
    email = db.Column('email', db.Unicode)
    last_login_date = db.Column('last_login_date', db.Date)
    registration_date = db.Column('registration_date', db.Date)
    first_name = db.Column('first_name', db.Unicode)
    last_name = db.Column('last_name', db.Unicode)
    subdomains = db.relationship('Subdomains', backref='user', lazy=True)

    def __init__(self, login, password, email, last_login_date, registration_date, first_name, last_name):  #, subdomains):s
        self.login = login
        self.set_password(password)
        self.email = email
        self.last_login_date = last_login_date
        self.registration_date = registration_date
        # self.subdomains = subdomains
        self.first_name = first_name
        self.last_name = last_name
    
    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class Subdomains(db.Model):
    __tablename = 'subdomains'
    id_domain = db.Column('id_domain', db.Integer, primary_key = True)
    id_user = db.Column('id_user', db.Integer, db.ForeignKey('users.id'))
    name = db.Column('name', db.Unicode)
    at = db.Column('at', db.Unicode)
    ip_address = db.Column('ip_address', db.Unicode)
    purchase_date = db.Column('purchase_date', db.Date)
    expiration_date = db.Column('expiration_date', db.Date)
    status = db.Column('status', db.Unicode)


    def __init__(self, id_user, name, at, ip_address, purchase_date, expiration_date, status):
        self.id_user = id_user
        self.name = name
        self.at = at
        self.ip_address = ip_address
        self.purchase_date = purchase_date
        self.expiration_date = expiration_date
        self.status = status

class Address(db.Model):
    __tablename = 'addresses'
    id = db.Column('id', db.Integer, primary_key = True)
    id_user = db.Column('id_user', db.Integer, db.ForeignKey('users.id'))
    country = db.Column('country', db.Unicode)
    state = db.Column('state', db.Unicode)
    city = db.Column('city', db.Unicode)
    street = db.Column('street', db.Unicode)
    house_nr = db.Column('house_nr', db.Integer)
    apartment_nr = db.Column('apartment_nr', db.Unicode)
    postal_code = db.Column('postal_code', db.Integer)

    def __init__(self, id_user, country, state, city, street, house_nr, apartment_nr, postal_code):
        self.id_user = id_user
        self.country = country
        self.state = state
        self.city = city
        self.street = street
        self.house_nr = house_nr
        self.apartment_nr = apartment_nr
        self.postal_code = postal_code

################
### API func ###
################

class Authorize(MethodView):
    def post(self):
        login = str(request.get_json()['login'])
        password = str(request.get_json()['password'])
        
        current_user = Users.query.filter_by(login = login).first()
        if (current_user and current_user.check_password(password)):
            access_token = create_access_token(identity = str(request.get_json()['login']))
            refresh_token = create_refresh_token(identity = str(request.get_json()['login']))           

            return json.dumps({
                'message' : 'success',
                'user_id' : current_user.id,
                'access_token' : access_token,
                'refresh_token' : refresh_token
            })
        else:
            return json.dumps({
                'message' : 'invalid credentials'
            })

class TokenRefresh(MethodView):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity = current_user)
        return json.dumps({
            'access_token': access_token
            })

class API_Addresses(MethodView):
    @jwt_required
    def get(self, user_id):
        if user_id is None:
            return json.dumps({'message' : 'no user id'}, ensure_ascii=False)

        else:
            count = db.engine.execute("select count(id) from addresses where id_user = '" + str(user_id) + "'")
            count2 = count.fetchall()
            count = count2[0][0]
            if count != 0:
                result = db.engine.execute("select * from addresses where id_user = '" + str(user_id) + "'")
                row = result.fetchall()
                subdom_dict = {
                    'id' : row[0][0],
                    'id_user' : row[0][1],
                    'country' : row[0][2],
                    'state' : row[0][3],
                    'city' : row[0][4],
                    'street' : row[0][5],
                    'house_nr' : row[0][6],
                    'apartment_nr' : row[0][7],
                    'postal_code' : row[0][8]}
                
                return json.dumps(subdom_dict, ensure_ascii=False)
            else:
                return json.dumps({'message' : "user doesn't have an address"}, ensure_ascii=False)

class API_Users(MethodView):
    # @jwt_required
    def get(self, user_id):
        if user_id is None:

            count = db.engine.execute("select count(id) from users")
            count2 = count.fetchall()
            count = count2[0][0]
            result = db.engine.execute("select * from users")
            row = result.fetchall()
            list = []
            for i in range(count):
                subdom_dict = {
                    #'id' : row[i][0],
                    'login' : row[i][1],
                    #'password' : row[i][2],
                    'email' : row[i][3],
                    'last_login_date' : str(row[i][4]),
                    'registration_date' : str(row[i][5]),
                    'first_name' : row[i][6],
                    'last_name' : row[i][7]}
                list.append(subdom_dict)
            
            return json.dumps(list, ensure_ascii=False)

        else:
            result = db.engine.execute("select * from users where id = '" + str(user_id) + "'")
            row = result.fetchall()
            subdom_dict = {
                'id' : row[0][0],
                'login' : row[0][1],
                'password' : row[0][2],
                'email' : row[0][3],
                'last_login_date' : str(row[0][4]),
                'registration_date' : str(row[0][5]),
                'first_name' : row[0][6],
                'last_name' : row[0][7]}
            
            return json.dumps(subdom_dict, ensure_ascii=False)

    def post(self):
        # return str(request.get_json())
        #def __init__(self, login, password, email, last_login_date, registration_date, subdomains, first_name, last_name):
        
        now = datetime.datetime.now()
        try:
            login = request.get_json()['login']
            password = request.get_json()['password']
            email = request.get_json()['email']
            registration_date = now.strftime('%Y-%m-%d')
            last_login_date = now.strftime('%Y-%m-%d')
            first_name = request.get_json()['first_name']
            last_name = request.get_json()['last_name']
        except:
            return json.dumps({'message' : 'wrong data given'})

        taken = Users.query.filter(Users.login == login).first()
        if taken:
            return json.dumps({'message' : 'Login is taken'})
        taken = Users.query.filter(Users.email == email).first()
        if taken:
            return json.dumps({'message' : 'Email is taken'})

        try:
            x = Users(login, password, email, last_login_date, registration_date,first_name,last_name)
        except:
            return json.dumps({'message' : 'error creating User'})
        db.session.add(x)
        db.session.commit()
        access_token = create_access_token(identity = str(request.get_json()['login']))
        refresh_token = create_refresh_token(identity = str(request.get_json()['login']))
        return json.dumps({'message' : 'success', 'user_id' : x.id, 'access_token' : access_token, 'refresh_token' : refresh_token})

    def delete(self, user_id):
        return 'delete user with id == ' + str(user_id)

    def put(self, user_id):
        columns = request.get_json()['columns']
        values = request.get_json()['values']
        usr = Users.query.get(user_id)
        if "login" in columns:
            login = values[columns.index("login")]
            usr.login = login
        
        if "password" in columns:
            password = values[columns.index("password")]
            usr.set_password(password) 

        if "first_name" in columns:
            first_name = values[columns.index("first_name")]
            usr.first_name = first_name

        if "last_name" in columns:
            last_name = values[columns.index("last_name")]
            usr.last_name = last_name

        if "email" in columns:
            email = values[columns.index("email")]
            usr.email = email       
        db.session.commit()

        return json.dumps({'message' : 'success'}, ensure_ascii=False)

class API_Subdomains(MethodView):
    @jwt_required
    def get(self,user_id):
        if user_id is None:
            count = db.engine.execute("select count(id_domain) from subdomains")
            count2 = count.fetchall()
            count = count2[0][0]
            result = db.engine.execute("select * from subdomains")
            row = result.fetchall()
            list = []
            for i in range(count):
                subdom_dict = {
                    'id_domain' : row[i][0],
                    'id_user' : row[i][1],
                    'name' : row[i][2],
                    'at' : row[i][3],
                    'ip_address' : row[i][4],
                    'purchase_date' : str(row[i][5]),
                    'expiration_date' : str(row[i][6]),
                    'status' : row[i][7]}
                list.append(subdom_dict)
            
            return json.dumps(list, ensure_ascii=False)

        else:
            count = db.engine.execute("select count(id_domain) from subdomains WHERE id_user = '" + str(user_id) + "'")
            count2 = count.fetchall()
            count = count2[0][0]
            result = db.engine.execute("select * from subdomains WHERE id_user = '" + str(user_id) + "'")
            row = result.fetchall()
            list = []
            for i in range(count):
                subdom_dict = {
                    'id_domain' : row[i][0],
                    'id_user' : row[i][1],
                    'name' : row[i][2],
                    'at' : row[i][3],
                    'ip_address' : row[i][4],
                    'purchase_date' : str(row[i][5]),
                    'expiration_date' : str(row[i][6]),
                    'status' : row[i][7]}
                list.append(subdom_dict)
            
            return json.dumps(list, ensure_ascii=False)

    def post(self):
        id_user = request.get_json()['id_user']
        name = request.get_json()['name']
        at = request.get_json()['at']
        ip_address = request.get_json()['ip_address']
        purchase_date = request.get_json()['purchase_date']
        expiration_date = request.get_json()['expiration_date']

        new_subdom = Subdomains(id_user, name, at, ip_address, purchase_date, expiration_date, 'ACTIVE')
        db.session.add(new_subdom)
        db.session.commit()

        return json.dumps({'message' : 'success'}, ensure_ascii=False)

    def put(self, subdomain_id):
        columns = request.get_json()['columns']
        values = request.get_json()['values']
        string = "UPDATE subdomains SET "
        for i in range (len(columns) - 1):
            string = string \
                    + str(columns[i]) \
                    + " = '" + str(values[i]) \
                    + "', "
        string = string \
                + str(columns[len(columns) - 1]) \
                + " = '" + str(values[len(columns) - 1]) \
                + "' WHERE id_domain = " \
                + str(subdomain_id)
        result = db.engine.execute(string)
        
        return json.dumps({'message' : 'success'}, ensure_ascii=False)

class API_Names(MethodView):
    decorators = [limiter.limit("1/second")]
    def get(self, name):
        subd = Subdomains.query.filter(Subdomains.name==str(name)).filter(Subdomains.status=="ACTIVE").first()
        if subd:
            return json.dumps({'message' : 'taken'}, ensure_ascii=False)
        else:
            return json.dumps({'message' : 'free'}, ensure_ascii=False)


class DNS_test(MethodView):
    decorators = [limiter.limit("1/second")]
    def get(self, record):
        if record is not None:

            subdomname = record + '.subdom.name.'
            ip = '150.254.78.3' # https://laboratoria.wmi.amu.edu.pl/en


            # creates a record set (or changes the IP if record already exists!)

            boto3.set_stream_logger('botocore')
            try:
                response = client.change_resource_record_sets(
                    HostedZoneId=zone_id,
                    ChangeBatch={
                        'Changes': [
                            {
                                'Action': 'UPSERT',
                                'ResourceRecordSet': {
                                    'Name': subdomname,
                                    'Type': 'A',
                                    'TTL': 1,
                                    'ResourceRecords': [
                                        {
                                            'Value': ip 
                                        }
                                    ],
                                }
                            }
                        ]
                    }
                )
                ### ta część zjebuje, ale kod powyżej działa - record dodaje się do route53, tylko do bazy danych już nie
                id_user = '3'
                name = record
                at = 'eu.pl'
                ip_address = ip
                purchase_date = '2019-12-12'
                expiration_date = '2019-12-1'

                new_subdom = Subdomains(id_user, name, at, ip_address, purchase_date, expiration_date, 'ACTIVE')
                db.session.add(new_subdom)
                db.session.commit()
                ### 
                return json.dumps({'message' : 'created record'}, ensure_ascii=False)
            except botocore.exceptions.ClientError as e:
                return json.dumps({'error' : e}, ensure_ascii=False)
        else:
            return json.dumps({'error' : 'no record'}, ensure_ascii=False)

##############
### routes ###
##############
user_view = API_Users.as_view('user_api')
subdom_view = API_Subdomains.as_view('sub_api')
names_view = API_Names.as_view('names_api')
adresses_view = API_Addresses.as_view('addresses_api')
auth = Authorize.as_view('auth')
refresh = TokenRefresh.as_view('refresh')
dns_test_view = DNS_test.as_view('test_dns')

application.add_url_rule('/login/', view_func=auth, methods=['POST'])
application.add_url_rule('/refresh/', view_func=refresh, methods=['POST'])

application.add_url_rule('/users/', defaults={'user_id':None},view_func=user_view, methods=['GET'])
application.add_url_rule('/users/', view_func=user_view, methods=['POST'])
application.add_url_rule('/users/<int:user_id>',view_func=user_view, methods=['GET','PUT','DELETE'])
application.add_url_rule('/users/<int:user_id>/subdomains/', view_func=subdom_view, methods=['GET'])

application.add_url_rule('/subdomains/', defaults={'user_id':None},view_func=subdom_view, methods=['GET'])
application.add_url_rule('/subdomains/',view_func=subdom_view, methods=['POST'])
application.add_url_rule('/subdomains/<int:subdomain_id>',view_func=subdom_view, methods=['PUT'])

application.add_url_rule('/names/', defaults={'name':None},view_func=names_view, methods=['GET'])
application.add_url_rule('/names/<string:name>', view_func=names_view, methods=['GET'])

application.add_url_rule('/addresses/', defaults={'user_id':None},view_func=adresses_view, methods=['GET'])
application.add_url_rule('/addresses/<int:user_id>', view_func=adresses_view, methods=['GET'])

application.add_url_rule('/dnstest/', defaults={'record':None},view_func=dns_test_view, methods=['GET'])
application.add_url_rule('/dnstest/<string:record>', view_func=dns_test_view, methods=['GET'])

if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()

'''
# full request syntax for record set modification

response = client.change_resource_record_sets(
    HostedZoneId='string',
    ChangeBatch={
        'Comment': 'string',
        'Changes': [
            {
                'Action': 'CREATE'|'DELETE'|'UPSERT',
                'ResourceRecordSet': {
                    'Name': 'string',
                    'Type': 'SOA'|'A'|'TXT'|'NS'|'CNAME'|'MX'|'NAPTR'|'PTR'|'SRV'|'SPF'|'AAAA'|'CAA',
                    'SetIdentifier': 'string',
                    'Weight': 123,
                    'Region': 'us-east-1'|'us-east-2'|'us-west-1'|'us-west-2'|'ca-central-1'|'eu-west-1'|'eu-west-2'|'eu-west-3'|'eu-central-1'|'ap-southeast-1'|'ap-southeast-2'|'ap-northeast-1'|'ap-northeast-2'|'ap-northeast-3'|'sa-east-1'|'cn-north-1'|'cn-northwest-1'|'ap-south-1',
                    'GeoLocation': {
                        'ContinentCode': 'string',
                        'CountryCode': 'string',
                        'SubdivisionCode': 'string'
                    },
                    'Failover': 'PRIMARY'|'SECONDARY',
                    'MultiValueAnswer': True|False,
                    'TTL': 123,
                    'ResourceRecords': [
                        {
                            'Value': 'string'
                        },
                    ],
                    'AliasTarget': {
                        'HostedZoneId': 'string',
                        'DNSName': 'string',
                        'EvaluateTargetHealth': True|False
                    },
                    'HealthCheckId': 'string',
                    'TrafficPolicyInstanceId': 'string'
                }
            },
        ]
    }
)
'''