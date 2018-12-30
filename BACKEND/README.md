# API

### Główna strona:
https://api.subdom.name <br/>
Wszystkie adresy podane poniżej trzeba dopisać do tego adresu, po '/'.
Dane zwracane są jako JSONy. Nazwy kolumn i tablic są po angielsku.

### login/
#### POST:
do wysłania:
`
    {
    "login" : login,
    "password" : pass
    }
`
jeżeli podana para danych istnieje, strona zwraca:

    {
    "access_token" : TOKEN,           //wygasa po 15min
    "message" : "success",
    "refresh_token" : REFRESH_TOKEN   //wygasa po 24h
    }

access token, który jest potrzebny do całej reszty (dodajemy do **headers**:
`
    {
    ...
    "Authentication" : "Bearer TOKEN",
    ...
    }
`

### refresh/
#### POST:
Wysyłamy header `Authorization: Bearer REFRESH_TOKEN`, otrzymujemy w odpowiedzi `"access_token" : TOKEN"`, z którego możemy dalej korzystać.

### users/
#### GET:
wyświetla dane wszystkich użytkowników w formie:

    {
    "email": string (Unicode),
    "last_login_date": string (format daty: "2018-06-04"),
    "login": string (Unicode),
    "password": string (Unicode),
    "registration_date": string (format daty: "2018-06-04"),
    "first_name": string (Unicode),
    "last_name": string (Unicode)
    },
    ...

#### POST:
Tworzy nowego użytkownika w bazie danych na podstawie otrzymanych informacji. Format przesyłania infomacji:

    {
        "login" = string,
        "password" = string,
        "email" = string,
        "first_name" = string,
        "last_name" = string
     }
*Hasło jest szyfrowane w momencie rejestracji.*
**Data rejestracji i pierwszego logowania jest automatycznie pobierana w momencie dodawania rekordu do bazy.**

### users/\<int:user_id\>
#### GET:
Wyświetla dane konkretnego usera o id = user_id, w takiej samej formie jak GET users/ + id i hasło
#### PUT:
zmienia dane użytkownika o id = user_id na podstawie JSONa otrzymanego *w danej formie:*

      {
      "columns" : ['lista stringów', 'z nazwami kolumn do zmiany'],
      "values" : ['lista stringów', 'z wartościami na które mają się zmienić']
      }

**! UWAGA ! - kolejność elementów w obu listach musi się zgadzać! Tzn. jeżeli mamy columns : [1,2,3] i values : [a,b,c] to kolumna 1 = a, 2 = b, 3 = c.**

#### DELETE: not implemented yet


### users/\<int:user_id\>/subdomains/
#### GET:
wyświetla wszystkie subdomeny konkretnego użytkownika o id=user_id, w formie:

    {
    "at": string (Unicode),
    "expiration_date": string (format daty: "2019-06-01"),
    "id_domain": int,
    "id_user": int,
    "ip_address": string (format: "77.65.89.81"),
    "name": "string (Unicode),
    "purchase_date": string (format daty: "2018-06-01"),
    "status": string (Unicode)"
    },
     ...



### subdomains/
#### GET:
Wyświetla wszystkie subdomeny, w formie takiej jak w users/<int:user_id>/subdomains
### subdomains/\<int:subdomain_id\>
Wyświetla dane konkretnej. 
#### POST:
Dodaje nową subdomenę, korzystając z danych przesłanych za pomocą JSONa w *takiej formie*:

    {
    "id_user" : int,
    "name" : string,
    "at" : string,
    "ip_address" : string (w formie '00.00.00.00'),
    "purchase_date" : data (w formie '2000-12-12'),
    "expiration_date" : data (w formie '2000-12-12')
    }
    
*UWAGA* funkcja dodaje stronę zarówno do bazy danych jak i rekordów AWS - tzn. w pełni funkcjonalnie rejestruje subdomenę.
   
#### PUT:
Edytuje subdomenę o id = subdomain_id korzystając z danych podanych w JSONie w *takiej formie*:
    
    {
    "id_user" : int,
    "id_domain" : int,
    "name" : string,
    "new_ip" : string (w formie '00.00.00.00')
    }
    
*UWAGA* funkcja edytuje wpis zarówno w bazie danych jak w rekordów AWS - tzn. w pełni funkcjonalnie edytuje record.

#### DELETE: not implemented yet

### names/\<string:name\>
#### GET:
Wyświetla wiadomość czy subdomana o podanym name jest zajęta czy nie. (`{"message" : "free"}` lub `{"message":"taken"}`)
**Jest limit na 1 request/second dla konkretnego adresu ip**

### addresses/ (może nie działać)
#### GET:
Wyświetla błąd, że nie podało się id użytkownika
### addresses/\<int:user_id\>
#### GET:

    {
    "id" : int,
    "id_user" : int,
    "country" : string,
    "state" : string,
    "city" : string,
    "street" : string,
    "house_nr" : int,
    "apartment_nr" : string,
    "postal_code" : int}
    }

### admin/
#### POST:
Zwraca potrzebne dane o użytkownikach lub subdomenach zalogowanemu adminowi korzystając z danych podanych w JSONie w *takiej formie*:
    
    {
    "id_admin" : int,
    "tag" : string ('users' lub 'subdomain'),
    "tag_id" : string (albo 'all' albo id konkretnego użytkownika lub subdomeny)
    }
