import React, { Component } from 'react';
import './LandingPage.css';
import Header from '../Layout/Header';
import MainNav from '../Layout/MainNav';
import DomainSearchSimple from '../DomainSearchSimple';

export default class Layout extends Component {
    render() {
        return (
            <div>
            <Header />
            <div id="container">
            <span className="main-page-title">Zarejestruj swoją stronę w domenie <span className="white-font">eu.</span><span className="red-font">pl</span>!</span>
            
            <DomainSearchSimple/> 
            
            <div className="main-page-tile">
            <span className="tile-header">Dlaczego warto?</span>
            
            <span className="tile-small-header">Gdy żadnej domeny jeszcze nie masz...</span>
            
            <ul>
            <li>łatwa promocja swojej strony internetowej</li>
            <li>bardzo dobre pozycjonowanie w wyszukiwarkach</li>
            <li>żeby nie dać się wyprzedzić konkurencji</li>
            </ul>
            
            
            <span className="tile-small-header">Gdy już posiadasz adres w domenie innej np.: .eu ...</span>
            
            <ul>
            <li>żeby nie tracić Klientów, którym zdarza się dodawać .pl na końcu domeny .eu</li>
            <li>żeby promować się pod kilkoma niezależnymi serwisami internetowymi</li>
            <li>żeby uzyskać szerszy zasięg dotarcia do potencjalnego Klienta  </li>
            <li>żeby konkurencja nie mogła zdobyć Twojego Klienta, który trafi do niej zamiast do Ciebie</li>
            </ul>
            
            <span className="tile-small-header">Wybrane przykłady pomyłek w przypadku adresów w domenie europejskiej .eu</span>
            
            
            <ul>
            <li>zamiast www.ccc.eu Klienci często wpisuja www.ccc.eu.pl</li>
            <li>zamiast www.europa.eu Klienci często wpisuja www.europa.eu.pl</li>
            <li>zamiast www.ubieranki.eu Klienci wpisywali www.ubieranki.eu.pl - świadomy abonent zarejestrował również domenę www.ubieranki.eu.pl, żeby nie tracić potencjalnych odwiedzin strony</li>
            <li>zamiast www.pierwszaki.eu Klienci wpisywali www.pierwszaki.eu.pl - świadomy abonent zarejestrował również domenę www.pierwszaki.eu.pl, żeby nie tracić potencjalnych odwiedzin strony</li>
            </ul>
            <br/><br/>
            Pomyłki dotycza również wiadomosci email wysyłanych na adresy w domenie .eu.
            Miesięcznie rejestrujemy ponad 200 000 takich pomyłek .
            Dzięki zarejestrowaniu adresu w domenie eu.pl nie stracisz cennych wiadomosci email wysyłanych do Ciebie,
            gdy Nadawca pomyli się i do adresu w domenie .eu dopisze .pl
            </div>
            
                        
            <div className="main-page-tile">
            <span className="tile-header">Cennik</span>
            </div>
            </div>
            </div>
            );
        }
    }
    