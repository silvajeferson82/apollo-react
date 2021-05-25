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


export const Dashboard = () => {

    useEffect(() => {
        //api.get('sms').then(resp => {
        //resp.data.month = []
        //resp.data.values = []
        //const a = resp.data.month
        //const b = resp.data.values
        // })
    }, []) 

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


    const [periodChart, setPeriodChart] = useState('semana');
    const [coluna, setColuna] = useState(['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo']);
    const [linhaSms, setLinhaSms] = useState([20,15,34,21,43,12,19]);

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
        const nomeValor = {
            provider: user.usuario_nome?.toUpperCase(),
            valor_provider: new Intl.NumberFormat('pt-BR', 
            {style: 'currency',currency: 'BRL'})
            .format(user.sum), 
        }
        return nomeValor
    })

    console.log('Aqui..',)
    
    useEffect(() => {
        //api.post('totalPerDay', {type: periodChart}).then(resp => {
            
        // })
        if (periodChart ===  'mes'){
            setColuna(['Jan','Fev','Mar','Abr','Maio','Jun','Jul','Ago','Sep','Out','Nov','Dez']);
            setLinhaSms([10,20,30,40,50,60,70,80,10,15,50,20]);
        }
        else if (periodChart === 'semana') {
            setColuna(['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo']);
            setLinhaSms([20,15,34,21,43,12,19]);
        }
        
        console.log(periodChart);
    }, [periodChart])



    const chartData = {
        labels: coluna,
        datasets: [
            {
                label: 'Relatorio envio SMS ',
                data: linhaSms,
                fill: false,
                borderColor: '#03A9F4'
            }
        ]
    };

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
                        
                    </div>
                    <img src="assets/layout/images/dashboard/graph-blue.svg" alt="apollo-layout" />
                </div>
            </div>

            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-2">
                    <h1>VALORES DE TRANSAÇÃO</h1>
                    <div className="overview-value">
                        {new Intl.NumberFormat('pt-BR', 
                        {style: 'currency',currency: 'BRL'})
                        .format(valorNegociado.Total_negociado)}
                    </div>
                    <div className="overview-ratio">
                        <div className="overview-direction">
                            <i className="pi pi-dollar"></i>
                        </div>
                        
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

            {/**Tabela Provider e valores */}
            <div className="p-col-12 p-md-6 task-list">
                <div>
                    <div className="card">
                        <DataTable
                         value={sum}
                         >
                            <Column field="provider" header="Provider"></Column>
                            <Column style={{textAlign: "right"}} field="valor_provider" header="Valor Negociado"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>

            {/**Grafico SMS */}
            <div className="p-col-12 p-md-6">
                <Panel header="Acompanhamento SMS">
                    <div>
                        <strong>Período</strong>
                        <select onChange={(e) => setPeriodChart(e.target.value)}>
                            <option value="semana">SEMANA</option>
                            <option value="mes">MÊS</option>
                        </select>
                    </div>
                    <Chart type="line" data={chartData} />
                </Panel>
            </div>
        </div>
            
        
    )

}
