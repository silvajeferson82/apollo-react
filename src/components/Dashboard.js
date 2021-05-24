import React, { useState, useEffect, useRef } from 'react';
import api from '../service/api'
import { Panel } from 'primereact/panel';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Chart } from 'primereact/chart';
import { ProgressBar } from 'primereact/progressbar';
import { Menu } from 'primereact/menu';
import { FullCalendar } from 'primereact/fullcalendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import ProductService from '../service/ProductService';
import EventService from '../service/EventService';

const chartData = {
    labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'],
    datasets: [
        {
            label: 'Envios SMS/Dia',
            data: [65, 59, 80, 81, 56],
            fill: false,
            borderColor: '#03A9F4'
        }/* ,
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: '#FFC107'
        } */
    ]
};

export const Dashboard = () => {

    const [products, setProducts] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [events, setEvents] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [city, setCity] = useState(null);
    const menu = useRef(null);
    const [pessoa, setPessoa] = useState({})
    const [valorNegociado, setValorNegociado] = useState({})
    const [sms, setSms] = useState ({})
    const [email, setEmail] = useState ({})
    const [valorProviders, setValoresProviders] = useState ([{}])
    const [valorSomaProvider, setValorSomaProvider] = useState ()

    /* const fullcalendarOptions = {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        defaultDate: '2019-01-01',
        header: {
            left: 'prev,next',
            center: 'title',
            right: ''
        },
        editable: true
    };

    let cities = [
        { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
        { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
        { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
        { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
        { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
    ];
 */
    /* let menuItems = [
        {
            label: 'Save', icon: 'pi pi-fw pi-check'
        },
        {
            label: 'Update', icon: 'pi pi-fw pi-refresh'
        },
        {
            label: 'Delete', icon: 'pi pi-fw pi-trash'
        }
    ]; */

    useEffect(() => {
        const productService = new ProductService();
        const eventService = new EventService();
        eventService.getEvents().then(data => setEvents(data));
        api.get('/baseCpf').then(response => setPessoa(response.data))
        api.get('/valorNegociado').then(response => setValorNegociado(response.data))
        api.get('/totalSms').then(response => setSms(response.data))
        api.get('/totalEmail').then(response => setEmail(response.data))
        api.get('/valoresProviders').then(response => setValoresProviders(response.data))
        
        
    }, []);
    
    const sum = valorProviders.map((user) => {
        const allan = {
            provider: user.usuario_nome,
            valor_provider: "R$ " + Number(user.sum).toFixed(2)
        }
        //return user.sum.toFixed(0)
        return allan
    })
    
    // const teste = sms(async (allan) => {
    //     const oi = await {
    //         provi: allan.Total_entregue
    //     }
    //     //return user.sum.toFixed(0)
    //     return oi
    // })
    console.log('SMS',sms)
    //console.log('SMS2',teste)

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

    return (
        <div className="p-grid dashboard">
            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-1"><h1>CADASTROS NA BASE</h1>
                    <div className="overview-value">{pessoa.Total_base}</div>
                    <div className="overview-ratio">
                        <div className="overview-direction">
                            <i className="pi pi-users"></i>
                        </div>
                        {/* <div className="overview-ratio-value">
                            51%
					    </div> */}
                    </div>
                    <img src="assets/layout/images/dashboard/graph-blue.svg" alt="apollo-layout" />
                </div>
            </div>

            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-2">
                    <h1>VALORES DE TRANSAÇÃO</h1>
                    <div className="overview-value">{valorNegociado.Total_negociado}</div>
                    <div className="overview-ratio">
                        <div className="overview-direction">
                            <i className="pi pi-dollar"></i>
                        </div>
                        {/* <div className="overview-ratio-value">
                            36%
					    </div> */}
                    </div>
                    <img src="assets/layout/images/dashboard/graph-green.svg" alt="apollo-layout" />
                </div>
            </div>

            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-3">
                    <h1>SMS ENVIADOS</h1>
                    <div className="overview-value">{sms.Total_sms}</div>
                    <div className="overview-ratio">
                        <div className="overview-direction">
                            <i className="pi pi-comment"></i>
                        </div>
                        {/* <div className="overview-ratio-value">
                            19%
					    </div> */}
                    </div>
                    <img src="assets/layout/images/dashboard/graph-yellow.svg" alt="apollo-layout" />
                </div>
            </div>

            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-4">
                    <h1>E-MAIL'S ENVIADOS</h1>
                    <div className="overview-value">{email.Total_email_geral}</div>
                    <div className="overview-ratio">
                        <div className="overview-direction">
                            <i className="pi pi-envelope"></i>
                        </div>
                        {/* <div className="overview-ratio-value">
                            25%
					    </div> */}
                    </div>
                    <img src="assets/layout/images/dashboard/graph-red.svg" alt="apollo-layout" />
                </div>
            </div>

            <div className="p-col-12">
                <Panel header="Status" className="circle-panel">
                    <div className="p-grid p-nogutter">
                        <div className="p-col-12 p-lg-3 p-md-6">
                            <div className="status-title" style={{ color: '#6ebc3b' }}>Pessoa Física</div>
                            <div className="circle1">
                                <i className="pi pi-user"></i>
                                <span style={{left: '30%'}}>{pessoa.Total_cpf}</span>
                            </div>
                        </div>
                        <div className="p-col-12 p-lg-3 p-md-6">
                            <div className="status-title" style={{ color: '#f6a821' }}>Pessoa Jurídica</div>
                            <div className="circle2">
                                <i className="pi pi-briefcase"></i>
                                <span>{pessoa.Total_cnpj}</span>
                            </div>
                        </div>
                        <div className="p-col-12 p-lg-3 p-md-6">
                            <div className="status-title" style={{ color: '#039ade' }}>Visitas na Plataforma</div>
                            <div className="circle3">
                                <i className="pi pi-eye"></i>
                                <span>50</span>
                            </div>
                        </div>
                        <div className="p-col-12 p-lg-3 p-md-6">
                            <div className="status-title" style={{ color: '#d66351' }}>Mensagens Entregues</div>
                            <div className="circle4">
                                <i className="pi pi-download"></i>
                                <span style={{top: "40%", left: "30%"}}>{Number(sms.Total_entregues).toFixed(0)}</span>
                            </div>
                        </div>
                    </div>
                </Panel>
            </div>

            <div className="p-col-12 p-md-6 p-lg-4 task-list" style={{width: "50%"}}>
                <div>
                    <div className="card">
                        <DataTable value={sum}>
                            <Column field="provider" header="Provider"></Column>
                            <Column style={{textAlign: "right"}} field="valor_provider" header="Valor Negociado"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>

            
            

            
            
            <div className="p-col-12 p-md-6">
                <Panel header="Relatório SMS">
                    <Chart type="line" data={chartData} />
                </Panel>
            </div>
        </div>
            
        
    )

}
