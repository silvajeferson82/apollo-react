import React, { useState, useEffect } from 'react';
import api from '../../service/api';
import { Panel } from 'primereact/panel'
import { Chart } from 'primereact/chart'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import { format, parseISO } from 'date-fns';
import AppTopbar from '../../AppTopbar';
import AppFooter from '../../AppFooter';
import AppBreadcrumb from '../../AppBreadcrumb';


const Dashboard = () => {

    const [pessoa, setPessoa] = useState({})
    const [valorNegociado, setValorNegociado] = useState({})
    const [sms, setSms] = useState({})
    const [email, setEmail] = useState({})
    const [valorProviders, setValoresProviders] = useState([{}])
    const [smsProviders, setSmsProviders] = useState([{}])
    const [smsData, setSmsData] = useState([{}])
    const [periodChart, setPeriodChart] = useState("7");
    const [coluna, setColuna] = useState([]);
    // const [coluna, setColuna] = useState(["01/06","04/06","07/06","08/06","10/06","15/06","18/06"]);

    const [linhaSms, setLinhaSms] = useState([]);
    // const [linhaSms, setLinhaSms] = useState([54,23288,26,40093,13463,19682,165]);

    const [loading, setLoading] = useState();
    const [displayBasic, setDisplayBasic] = useState(true);
    const [graphBarRow] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'])
    const [graphBarCollum] = useState([65, 59, 80, 81, 56, 55, 40])
    const [topbarMenuActive, setTopbarMenuActive] = useState(false);
    const [activeTopbarItem, setActiveTopbarItem] = useState(null);
    const [chartData, setChartData] = useState({})
    // coluna.length > 0 ? setTeste('hahaha') : console.log('pitel',teste)

    // coluna.length > 0 ? console.log('haha') : console.log('hoho')

    const basicData = {
        labels: graphBarRow,
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: '#42A5F5',
                data: graphBarCollum
            }
        ]
    };

    let menuClick;

    async function getItems() {
        setLoading(true)
        try {
            const { data } = await api.get('/baseCpf');
            setPessoa(data)
        } catch (error) {
            console.log(error)
        }

        try {
            const { data } = await api.get('/valorNegociado');
            setValorNegociado(data)
        } catch (error) {
            console.log(error)
        }

        try {
            const { data } = await api.get('/totalSms');
            setSms(data)
        } catch (error) {
            console.log(error)
        }

        try {
            const { data } = await api.get('/totalEmail');
            setEmail(data)
        } catch (error) {
            console.log(error)
        }

        try {
            const { data } = await api.get('/valoresProviders');
            setValoresProviders(data)
        } catch (error) {
            console.log(error)
        }

        try {
            const { data } = await api.get('/smsProviders');
            setSmsProviders(data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    async function getGraph() {
        try {
            const { data } = await api.get(`smsPeriodo/${periodChart}`);
            setSmsData(data)
        } catch (error) {
            console.log(error)
        }
    }

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarMenuActive(false);
        event.preventDefault();
    }

    const onTopbarMenuButtonClick = (event) => {
        setTopbarMenuActive(prevState => !prevState)
        event.preventDefault();
    }

    const onTopbarItemClick = (event) => {
        if (activeTopbarItem === event.item)
            setActiveTopbarItem(null);
        else
            setActiveTopbarItem(event.item);

        event.originalEvent.preventDefault();
    }

    const sum = valorProviders.map((user) => {
        const nomeValor = {
            provider: user.usuario_nome?.toUpperCase(),
            valor_provider: new Intl.NumberFormat('pt-BR',
                { style: 'currency', currency: 'BRL' })
                .format(user.sum),
        }
        return nomeValor
    })

    const getLightTheme = () => {

        let horizontalOptions = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        return {
            horizontalOptions
        }
    }

    const { horizontalOptions } = getLightTheme();

    const descendingList = smsProviders.sort(function (a, b) {
        if (parseInt(a.qtd) < parseInt(b.qtd)) {
            return 1;
        }
        if (parseInt(a.qtd) > parseInt(b.qtd)) {
            return -1;
        }

        return 0;
    })

    const smsProvider = descendingList.map((user) => {
        const nomeSms = {
            providerSms: user.provider?.toUpperCase(),
            providerQtdSms: new Intl.NumberFormat('pt-BR').format(user.qtd)
        }

        return nomeSms
    })

    const headerSms = () => {
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <span>Chart By Period</span>
                    <select style={{ border: "none", marginLeft: '0.8rem' }} onChange={(e) => setPeriodChart(e.target.value)}>
                        <option value="7">WEEK</option>
                        <option value="30">MONTH</option>
                    </select>
                </div>
            </div>
        )
    }

    function sendChartData() {
        setChartData(
            {
                labels: coluna,
                datasets: [
                    {
                        label: 'SMS sended flow',
                        data: linhaSms,
                        fill: true,
                        borderColor: '#03A9F4'
                    }
                ]
            })

    }

    function buildGraph() {
        const date = smsData.map((user) => {
            if (user && user.date) {
                const name = [
                    user.date ? format(parseISO(user.date), 'dd/MM') : '2021-01-01'
                ]
                return name

            } else {
                return ''
            }
        });

        const qtd = smsData.map((user) => {
            if (user && user.qtd) {
                const name = [
                    user.qtd
                ]

                return name
            } else {
                return ''
            }
        });

        const arrayQtd = qtd.reduce((list, sub) => list.concat(sub), [])
        setColuna(date.reverse());
        setLinhaSms(arrayQtd.reverse());
    }

    useEffect(() => {
        getItems()
    }, []);

    useEffect(() => {
        if (coluna && linhaSms) {
            sendChartData()
        }
    }, [linhaSms])

    useEffect(() => {
        getGraph()
    }, [periodChart])

    useEffect(() => {
        if (smsData.length > 0) {
            buildGraph();
        }
    }, [smsData]);

    return (
        <div>
            <AppTopbar
                topbarMenuActive={topbarMenuActive}
                activeTopbarItem={activeTopbarItem}
                onMenuButtonClick={onMenuButtonClick}
                onTopbarMenuButtonClick={onTopbarMenuButtonClick}
                onTopbarItemClick={onTopbarItemClick}
            />
            <AppBreadcrumb />
            <div className="layout-content-container">
                <div className="p-grid dashboard">
                    {loading ?
                        <Dialog closable={false} style={{ boxShadow: "none" }} showHeader={false} visible={displayBasic} onHide={() => setDisplayBasic(false)}>
                            <ProgressSpinner style={{ width: '70px', padding: "20px", margin: '20px' }} strokeWidth="4" animationDuration="2.5s" />
                        </Dialog>
                        : false}
                    <div className="p-col-12 p-md-3">
                        <div className="overview-box overview-box-1">
                            <h1 style={{ fontWeight: "bold" }}>PLATFORM PROFILES</h1>
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
                            <h1 style={{ fontWeight: "bold" }}>TRANSACTIONS VALUES</h1>
                            <div className="overview-value">
                                {new Intl.NumberFormat('pt-BR',
                                    { style: 'currency', currency: 'BRL' })
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
                            <h1 style={{ fontWeight: "bold" }}>SMS SENTS</h1>
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
                            <h1 style={{ fontWeight: "bold" }}>EMAILS SENTS</h1>
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
                                        <span style={{ left: '30%' }}>{pessoa.Total_cpf}</span>
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
                                    <div className="status-title" style={{ color: '#039ade' }}>Platform Views</div>
                                    <div className="circle3">
                                        <i className="pi pi-eye"></i>
                                        <span>50</span>
                                    </div>
                                </div>
                                <div className="p-col-12 p-lg-3 p-md-6">
                                    <div className="status-title" style={{ color: '#d66351' }}>Delivered Messages</div>
                                    <div className="circle4">
                                        <i className="pi pi-download"></i>
                                        <span style={{ top: "40%", left: "30%" }}>{Number(sms.Total_entregues).toFixed(0)}</span>
                                    </div>
                                </div>
                            </div>
                        </Panel>
                    </div>

                    {/**Tabela Provider e valores */}
                    <div className="p-col-12 p-md-6">
                        {/* <div> */}
                        <div id="card1" className="card">
                            <DataTable value={sum}>
                                <Column field="provider" header="Provider"></Column>
                                <Column style={{ textAlign: "right" }} field="valor_provider" header="Traded Values"></Column>
                            </DataTable>
                        </div>
                        {/* </div> */}
                    </div>

                    {/**Grafico BARCHAR */}
                    <div className="p-col-12 p-md-6">
                        <div id="card2" className="card">
                            <Chart type="bar" data={basicData} options={horizontalOptions} />
                        </div>
                    </div>


                    <div className="p-col-12 p-md-6 task-list">
                        {/* <div> */}
                        <div id="card3" className="card">
                            <DataTable value={smsProvider} >
                                <Column
                                    field="providerSms"
                                    header="Provider"></Column>
                                <Column style={{ textAlign: "right" }}
                                    field="providerQtdSms"
                                    header="SMS Enviados"></Column>
                            </DataTable>
                        </div>
                        {/* </div> */}
                    </div>

                    {/*Grafico SMS */}
                    <div className="p-col-12 p-md-6">
                        {/* <div id="card4"className="card"> */}
                        <Panel id="card4" header={headerSms}>
                            {chartData && linhaSms &&
                                <Chart type="line" data={chartData} />
                            }
                        </Panel>
                        {/* </div>     */}
                    </div>
                </div>
            </div>
            <AppFooter />
        </div>
    )
}

export default Dashboard;
