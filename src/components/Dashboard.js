import React, { useState, useEffect, useRe } from 'react';
import api from '../service/api';
import { Panel } from 'primereact/panel'
import { Chart } from 'primereact/chart'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import {format, parseISO, set} from 'date-fns';

export const Dashboard = () => {

    useEffect(() => {
        //api.get('sms').then(resp => {
        //resp.data.month = []
        //resp.data.values = []
        //const a = resp.data.month
        //const b = resp.data.values
        // })
    }, []) 
   
    const [events, setEvents] = useState(null);
    const [pessoa, setPessoa] = useState({})
    const [valorNegociado, setValorNegociado] = useState({})
    const [sms, setSms] = useState ({})
    const [email, setEmail] = useState ({})
    const [valorProviders, setValoresProviders] = useState([{}])
    const [teste, setTeste] = useState([{}])


    const [periodChart, setPeriodChart] = useState("7");
    const [coluna, setColuna] = useState([]);
    const [linhaSms, setLinhaSms] = useState([]);

    useEffect(() => {
        async function getItems(){
            try {
                await api.get('/baseCpf').then(response => setPessoa(response.data))
                await api.get('/valorNegociado').then(response => setValorNegociado(response.data))
                await api.get('/totalSms').then(response => setSms(response.data))
                await api.get('/totalEmail').then(response => setEmail(response.data))
                await api.get('/valoresProviders').then(response => setValoresProviders(response.data))
            } catch (error) {
                console.log(error)
            }
        }
        getItems()
    }, []);
    
    console.log('willys', periodChart)
    

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
        //api.post('totalPerDay', {type: periodChart}).then(resp => {
            
        // })
        async function getGraph() {
            try {
                await api.get(`smsPeriodo/${periodChart}`).then(response => setTeste(response.data))
            } catch (error) {
                console.log(error)
            }
            

            if (periodChart ===  '7'){
                setColuna(date.reverse());
                setLinhaSms(qtd.reverse());
                console.log("aaaaaaaaaaaaaaaaaaaaa")
                console.log('sacotex', teste)
            }
            else if (periodChart === '30') {
                setColuna(date.reverse());
                setLinhaSms(qtd.reverse());
                console.log('entrou aqui')
            }
    
        }
        getGraph()
        console.log("valor",periodChart);
    }, [periodChart])


    const date = teste.map((user) => {
        const name = [
            user.date ? format(parseISO(user.date),'dd/MM') : '2021-01-01'
        ]
        return name
    })

    const qtd = teste.map((user) => {
        const name = [
            user.qtd
        ]
        return name
    })

    console.log('a', date)
    console.log('b', qtd)

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
                            <option value="7">SEMANA</option>
                            <option value="30">MÊS</option>
                        </select>
                    </div>
                    <Chart type="line" data={chartData} />
                </Panel>
            </div>
        </div>
            
        
    )

}
