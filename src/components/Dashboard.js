import React, { useState, useEffect } from 'react';
import api from '../service/api';
import { Panel } from 'primereact/panel'
import { Chart } from 'primereact/chart'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import { format, parseISO } from 'date-fns';
import AppTopbar from '../AppTopbar';
import AppBreadcrumb from '../AppBreadcrumb';

export const Dashboard = () => {

    const [pessoa, setPessoa] = useState({})
    const [valorNegociado, setValorNegociado] = useState({})
    const [sms, setSms] = useState ({})
    const [email, setEmail] = useState ({})
    const [valorProviders, setValoresProviders] = useState([{}])
    const [smsData, setSmsData] = useState([{}])
    const [periodChart, setPeriodChart] = useState("7");
    const [coluna, setColuna] = useState([]);
    const [linhaSms, setLinhaSms] = useState([]);
    const [loading, setLoading] = useState();
    const [displayBasic, setDisplayBasic] = useState(true);

    const [topbarMenuActive, setTopbarMenuActive] = useState(false);
    const [activeTopbarItem, setActiveTopbarItem] = useState(null);
    const [layoutMode, setLayoutMode] = useState('static');
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);

    let menuClick;
    let topbarItemClick;

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarMenuActive(false);

        if (layoutMode === 'overlay' && !isMobile()) {
            setOverlayMenuActive(prevState => !prevState);
        } else {
            if (isDesktop())
                setStaticMenuDesktopInactive(prevState => !prevState);
            else
                setStaticMenuMobileActive(prevState => !prevState);
        }

        event.preventDefault();
    }

    const onTopbarMenuButtonClick = (event) => {
        topbarItemClick = true;
        setTopbarMenuActive(prevState => !prevState)
        hideOverlayMenu();
        event.preventDefault();
    }
    
    const onTopbarItemClick = (event) => {
        topbarItemClick = true;

        if (activeTopbarItem === event.item)
            setActiveTopbarItem(null);
        else
            setActiveTopbarItem(event.item);

        event.originalEvent.preventDefault();
    }

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false)
    }

    const onDocumentClick = (event) => {
        if (!topbarItemClick) {
            setActiveTopbarItem(null)
            setTopbarMenuActive(false)
        }

        if (!menuClick) {
            if (isHorizontal() || isSlim()) {
                setMenuActive(false)
            }

            hideOverlayMenu();
        }

        topbarItemClick = false;
        menuClick = false;
    }

    const isMobile = () => {
        return window.innerWidth < 1025;
    }

    const isDesktop = () => {
        return window.innerWidth > 1024;
    }

    const isHorizontal = () => {
        return layoutMode === 'horizontal';
    }

    const isSlim = () => {
        return layoutMode === 'slim';
    }
    
    useEffect(() => {
        getItems()
    }, []);
    
    async function getItems(){
        try {
            setLoading(true)
            await api.get('/baseCpf').then(response => setPessoa(response.data))
            await api.get('/valorNegociado').then(response => setValorNegociado(response.data))
            await api.get('/totalSms').then(response => setSms(response.data))
            await api.get('/totalEmail').then(response => setEmail(response.data))
            await api.get('/valoresProviders').then(response => setValoresProviders(response.data))
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const sum = valorProviders.map((user) => {
        const nomeValor = {
            provider: user.usuario_nome?.toUpperCase(),
            valor_provider: new Intl.NumberFormat('pt-BR', 
            {style: 'currency',currency: 'BRL'})
            .format(user.sum), 
        }
        return nomeValor
    })
    
    useEffect(() => {
        console.log('aqui');
        console.log(periodChart);
        getGraph()
    }, [periodChart])

    async function getGraph() {
        console.log(periodChart)
        try {
            console.log(periodChart)
            await api.get(`smsPeriodo/${periodChart}`).then(response => setSmsData(response.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (smsData.length > 0) {
            buildGraph();

        }
    }, [smsData]);

    function buildGraph() {
        const date = smsData.map((user) => {
            if (user && user.date) {
                const name = [
                    user.date ? format(parseISO(user.date),'dd/MM') : '2021-01-01'
                ]
                return name
    
            } else {
                return 'caralho'
            }
        });

        const qtd = smsData.map((user) => {
            if (user && user.qtd) {
                const name = [
                    user.qtd
                ]
                return name
            } else {
                return 'aaaaaaa'
            }
        });

            setColuna(date.reverse());
            setLinhaSms(qtd.reverse());
    }

    const chartData = {
        labels: coluna,
        datasets: [
            {
                label: 'Fluxo de envio SMS',
                data: linhaSms,
                fill: true,
                borderColor: '#03A9F4'
            }
        ]
    };

    const headerSms = ()=> {
        return(
            <div>
            <div style={{display:'flex'}}>
                <span>Relatorio por Período</span>
                    <select style={{border:"none", marginLeft:'0.8rem'}} onChange={(e) => setPeriodChart(e.target.value)}>
                        <option value="7">SEMANA</option>
                        <option value="30">MÊS</option>
                    </select>
            </div>
            </div>
        )
    }

    return (

    <div>
            <AppTopbar
                topbarMenuActive={topbarMenuActive} activeTopbarItem={activeTopbarItem}
                onMenuButtonClick={onMenuButtonClick}
                onTopbarMenuButtonClick={onTopbarMenuButtonClick}
                onTopbarItemClick={onTopbarItemClick} />
            <AppBreadcrumb />

        <div className="layout-content-container">    
        <div className="p-grid dashboard">
            {loading ? <Dialog closable={false} visible={displayBasic} onHide={() => setDisplayBasic(false)}>
                    <ProgressSpinner style={{width: '70px', padding: "20px", margin: '20px'}} strokeWidth="4" animationDuration="2.5s"/>  
                </Dialog>
             : false} 
            
            
            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-1"><h1 style={{fontWeight: "bold"}}>BASE RECORDS</h1>
                    <div className="overview-value">{pessoa.Total_base}</div>
                    <div className="overview-ratio">
                        <div className="overview-direction">
                            <i className="pi pi-users"></i>
                        </div>
                        
                    </div>
                    <img src="assets/layout/images/dashboard/graph-red.svg" alt="apollo-layout" />
                </div>
            </div>

            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-2">
                    <h1 style={{fontWeight: "bold"}}>VALORES DE TRANSAÇÃO</h1>
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
                    <img src="assets/layout/images/dashboard/graph-red.svg" alt="apollo-layout" />
                </div>
            </div>

            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-3">
                    <h1 style={{fontWeight: "bold"}}>SMS SENTS</h1>
                    <div className="overview-value">{sms.Total_sms}</div>
                    <div className="overview-ratio">
                        <div className="overview-direction">
                            <i className="pi pi-comment"></i>
                        </div>
                        
                    </div>
                    <img src="assets/layout/images/dashboard/graph-red.svg" alt="apollo-layout" />
                </div>
            </div>

            <div className="p-col-12 p-md-3">
                <div className="overview-box overview-box-4">
                    <h1 style={{fontWeight: "bold"}}>SENT EMAILS</h1>
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
                            <div className="status-title" style={{ color: '#6ebc3b' }}>Natural Person</div>
                            <div className="circle1">
                                <i className="pi pi-user"></i>
                                <span style={{left: '30%'}}>{pessoa.Total_cpf}</span>
                            </div>
                        </div>
                        <div className="p-col-12 p-lg-3 p-md-6">
                            <div className="status-title" style={{ color: '#f6a821' }}>Legal Entity</div>
                            <div className="circle2">
                                <i className="pi pi-briefcase"></i>
                                <span>{pessoa.Total_cnpj}</span>
                            </div>
                        </div>
                        <div className="p-col-12 p-lg-3 p-md-6">
                            <div className="status-title" style={{ color: '#039ade' }}>PlatformViews</div>
                            <div className="circle3">
                                <i className="pi pi-eye"></i>
                                <span>50</span>
                            </div>
                        </div>
                        <div className="p-col-12 p-lg-3 p-md-6">
                            <div className="status-title" style={{ color: '#d66351' }}>Delivered Messages</div>
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
                            <Column style={{textAlign: "right"}} field="valor_provider" header="Traded Values"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>

            {/**Grafico SMS */}
            <div className="p-col-12 p-md-6">
                <Panel header={headerSms}>
                    <Chart type="line" data={chartData} />
                </Panel>
                
            </div>
        </div>
        </div> 
        </div>   
        
    )

}
