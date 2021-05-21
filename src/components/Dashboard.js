import React, { useState, useEffect, useRef } from 'react';
import api from '../service/api'
import { Panel } from 'primereact/panel';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Chart } from 'primereact/chart';
import { ProgressBar } from 'primereact/progressbar';
import { Menu } from 'primereact/menu';
import { FullCalendar } from 'primereact/fullcalendar';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import ProductService from '../service/ProductService';
import EventService from '../service/EventService';
import { PrimeIcons } from 'primereact/api';



export const Dashboard = () => {

    const [products, setProducts] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [events, setEvents] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [city, setCity] = useState(null);
    const menu = useRef(null);
    const [sms, setSms] = useState("")
    const [smsDetalhes, setSmsDetalhes] = useState({})
    const [email, setEmail] = useState("")

   

    useEffect(() => {
        const productService = new ProductService();
        const eventService = new EventService();
        eventService.getEvents().then(data => setEvents(data));
        productService.getProductsSmall().then(data => setProducts(data));
        api.get('/totalSms').then(response => {setSms(response.data.total_sms_geral)})
        api.get('/totalEmail').then(response => {setEmail(response.data.Total_email_geral)})
        api.get('/smsRelatorio').then(response => {setSmsDetalhes(response.data)})
    }, []);

    console.log("haha", smsDetalhes)
    console.log("dia", smsDetalhes.total_sms_dia)

    const onTaskChange = (e) => {
        let selectedTasks = [...tasks];
        if (e.checked)
            selectedTasks.push(e.value);
        else
            selectedTasks.splice(selectedTasks.indexOf(e.value), 1);
        setTasks(selectedTasks);
    };

    const onCityChange = (e) => {
        setCity(e.value);
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const logoTemplate = (rowData, column) => {
        var src = "assets/demo/images/product/" + rowData.image;
        return <img src={src} alt={rowData.brand} width="50px" />;
    };

    const actionTemplate = (rowData, column) => {
        return <div className="p-grid">
            <Button icon="pi pi-search" type="button" className="p-button-success p-mr-2 p-mb-1"></Button>
            <Button icon="pi pi-times" type="button" className="p-button-danger p-mb-1"></Button>
        </div>
    };

    const CardDemo = () => {

        const header = (
            <img alt="Card" src="showcase/demo/images/usercard.png" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/23.523.5/05/placeholder.png'} />
        );
        const footer = (
            <span>
                <Button label="Save" icon="pi pi-check" />
                <Button label="Cancel" icon="pi pi-times" className="p-button-secondary p-ml-2" />
            </span>
        );
    }
        
    return (
        
        <div className="p-grid dashboard">
            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-1">
                    <h1 style={{ fontWeight: 'bold'}}>E-MAILS ENVIADOS</h1>
                    <div className="overview-value">{email}</div>
                    <div className="overview-ratio">
                        <div className="overview-direction">
                            <i className="pi pi-envelope"></i>
                        </div>  
                    </div> 
                </div>
            </div>

            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-1">
                    <h1 style={{ fontWeight: 'bold'}}>SMS ENVIADOS</h1>
                    <div className="overview-value">{sms}</div>
                    <div className="overview-ratio">
                        <div className="overview-direction">
                            <i className="pi pi-comment"></i>
                        </div>  
                    </div> 
                </div>
            </div>

            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-1">
                    <h1 style={{ fontWeight: 'bold'}}>TOTAL VALOR NEGOCIADO</h1>
                    <div className="overview-value">R$ 452.000,00</div>
                    <div className="overview-ratio">
                        <div className="overview-direction">
                            <i className="pi pi-dollar"></i>
                        </div>  
                    </div>
                </div>
            </div>

            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-1">
                    <h1 style={{ fontWeight: 'bold'}}>CADASTRO NA BASE</h1>
                    <div className="overview-value">65922</div>
                    <div className="overview-ratio">
                        <div className="overview-direction">
                            <i className="pi pi-users"></i>
                        </div>  
                    </div>
                </div>
            </div>  

            <div className="p-col-12 p-md-3">
                <Card className="overview-box" title="E-mails" subTitle="Envios"  /* style={{ width: '23.5rem' }} */>
                    <ul>
                        <li>HOJE: </li>
                        <li>SEMANA: </li>
                        <li>MÊS: </li>
                    </ul>
                </Card>
            </div>  
            <div className="p-col-12 p-md-3">
                <Card className="overview-box" title="SMS" subTitle="Envios" /* style={{ width: '23.5rem' }} */ >
                    
                    <ul>
                        <li>HOJE: {smsDetalhes.total_sms_dia}</li>
                        <li>SEMANA: {smsDetalhes.total_sms_semana}</li>
                        <li>MÊS: {smsDetalhes.total_sms_mes}</li>
                    </ul>   
                </Card>
            </div>
            <div className="p-col-12 p-md-3">
                <Card className="overview-box" title="VALORES" subTitle="POR CLIENTE" /* style={{ width: '23.5rem' }} */ >
                    <ul>
                        <li>HOJE: </li>
                        <li>SEMANA: </li>
                        <li>MÊS: </li>
                    </ul>
                </Card>
            </div>
            <div className="p-col-12 p-md-3">
                <Card className="overview-box" title="CADASTROS" subTitle="Subtitle" /* style={{ width: '23.5rem' }} */ >
                    <ul>
                        <li>HOJE: </li>
                        <li>SEMANA: </li>
                        <li>MÊS: </li>
                    </ul>
                </Card>
            </div>
            {/* Imagens */}
            <div>
                <div /* className="p-col-12" style={{border: '1px solid black'}} */>
                    <div className="card" style={{display:'flex'}}>
                        <div className="p-carousel p-component p-carousel-horizontal"> 
                        <div className="p-carousel-content">
                            <div className="p-carousel-container">
                                <div className="p-carousel-items-content" style={{height: "auto"}}>
                                    <div className="p-carousel-items-container p-items-hidden">
                                        <div className="p-carousel-item p-carousel-item-active p-carousel-item-start">
                                            <div className="product-item">
                                                <div className="product-item-content">
                                                    <div className="p-mb-3">
                                                         <img src="assets/demo/images/product/bamboo-watch.jpg" alt="Bamboo Watch" class="product-image"/>
                                                    </div>
                                                    <div>
                                                        <h4 className="p-mb-1">Protesto</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-carousel-items p-carousel-item-active">
                                        <div className="product-item">
                                            <div className="product-item-content">
                                                <div className="p-mb-3">
                                                    <img src="assets/demo/images/product/bamboo-watch.jpg" alt="Bamboo Watch" class="product-image"/>
                                                </div>
                                                <div>
                                                    <h4 className="p-mb-1">Protesto</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-carousel-item p-carousel-item-active p-carousel-item-end">
                                            <div className="product-item">
                                                <div className="product-item-content">
                                                    <div className="p-mb-3">
                                                        <img src="assets/demo/images/product/bamboo-watch.jpg" alt="Bamboo Watch" class="product-image"/>
                                                    </div>
                                                    <div>
                                                        <h4 className="p-mb-1">Protesto</h4>    
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                     </div> 
                    </div> 
                </div>
            </div>
        </div>
        
        

    )

}
