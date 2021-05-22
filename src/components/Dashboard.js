import React, { useState, useEffect, useRef } from 'react';

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
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#03A9F4'
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: '#FFC107'
        }
    ]
};

export const Dashboard = () => {

    const [products, setProducts] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [events, setEvents] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [city, setCity] = useState(null);
    const menu = useRef(null);

    const fullcalendarOptions = {
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

    let menuItems = [
        {
            label: 'Save', icon: 'pi pi-fw pi-check'
        },
        {
            label: 'Update', icon: 'pi pi-fw pi-refresh'
        },
        {
            label: 'Delete', icon: 'pi pi-fw pi-trash'
        }
    ];

    useEffect(() => {
        const productService = new ProductService();
        const eventService = new EventService();
        eventService.getEvents().then(data => setEvents(data));
        productService.getProductsSmall().then(data => setProducts(data));
    }, []);

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
                <div className="overview-box overview-box-1"><h1>PESSOAS</h1>
                    <div className="overview-value">$25,620</div>
                    <div className="overview-ratio">
                        <div className="overview-direction">
                            <i className="pi pi-arrow-up"></i>
                        </div>
                        <div className="overview-ratio-value">
                            51%
					</div>
                    </div>
                    <img src="assets/layout/images/dashboard/graph-blue.svg" alt="apollo-layout" />
                </div>
            </div>

            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-2">
                    <h1>VALORES DE TRANSAÇÃO</h1>
                    <div className="overview-value">9521</div>
                    <div className="overview-ratio">
                        <div className="overview-direction">
                            <i className="pi pi-arrow-up"></i>
                        </div>
                        <div className="overview-ratio-value">
                            36%
					</div>
                    </div>
                    <img src="assets/layout/images/dashboard/graph-green.svg" alt="apollo-layout" />
                </div>
            </div>

            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-3">
                    <h1>SMS</h1>
                    <div className="overview-value">452</div>
                    <div className="overview-ratio">
                        <div className="overview-direction">
                            <i className="pi pi-arrow-up"></i>
                        </div>
                        <div className="overview-ratio-value">
                            19%
					</div>
                    </div>
                    <img src="assets/layout/images/dashboard/graph-yellow.svg" alt="apollo-layout" />
                </div>
            </div>

            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-4">
                    <h1>E-MAIL</h1>
                    <div className="overview-value">65922</div>
                    <div className="overview-ratio">
                        <div className="overview-direction">
                            <i className="pi pi-arrow-up"></i>
                        </div>
                        <div className="overview-ratio-value">
                            25%
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
                                <span>75</span>
                            </div>
                        </div>
                        <div className="p-col-12 p-lg-3 p-md-6">
                            <div className="status-title" style={{ color: '#f6a821' }}>Pessoa Jurídica</div>
                            <div className="circle2">
                                <i className="pi pi-mobile"></i>
                                <span>25</span>
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
                                <i className="pi pi-dollar"></i>
                                <span>75</span>
                            </div>
                        </div>
                    </div>
                </Panel>
            </div>

            <div className="p-col-12 p-md-6 p-lg-4 task-list">
                <div>
                    <div className="card">
                        <DataTable value={products}>
                            <Column field="code" header="Provider"></Column>
                            <Column style={{textAlign: "right"}} field="name" header="Valor Negociado"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>

            
            

            
            
            <div className="p-col-12 p-md-6">
                <Panel header="Core 1 Data">
                    <Chart type="line" data={chartData} />
                </Panel>
            </div>
        </div>
            
        
    )

}
