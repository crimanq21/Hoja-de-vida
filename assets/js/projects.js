document.addEventListener('DOMContentLoaded', () => {
    const scenarios = {
        citas: {
            buttonLabel: 'Citas médicas',
            summary: 'Escenario enfocado en seguimiento de agenda, ausentismo y oportunidades de reagendamiento para mejorar la continuidad del servicio.',
            metrics: [
                { label: 'Citas analizadas', value: '12.480', caption: 'Volumen consolidado del periodo evaluado.' },
                { label: 'Ausentismo', value: '8,4 %', caption: 'Porcentaje detectado por IA sobre citas programadas.' },
                { label: 'Reagendables', value: '1.126', caption: 'Casos con mayor probabilidad de recuperación.' }
            ],
            highlights: [
                'La IA identifica especialidades y sedes con mayor concentración de ausentismo.',
                'El flujo prioriza pacientes críticos y propone campañas de confirmación preventiva.',
                'Se genera resumen ejecutivo con causas recurrentes y acciones sugeridas.'
            ],
            messages: [
                { role: 'user', author: 'Usuario de negocio', time: '09:00', text: 'Necesito un resumen del comportamiento de citas médicas de la última semana y posibles acciones para reducir ausentismo.' },
                { role: 'coordinator', author: 'Agente coordinador', time: '09:00', text: 'Entendido. Consultaré el agente de datos para revisar volumen, especialidades críticas y variación de ausentismo.' },
                { role: 'data', author: 'Agente de datos', time: '09:01', text: 'Consulta completada.\n- 12.480 citas programadas\n- 1.048 ausencias\n- Mayor concentración: medicina interna y odontología\n- Sedes con mayor impacto: Norte y Centro' },
                { role: 'analyst', author: 'Agente analítico', time: '09:01', text: 'Hallazgos: el ausentismo aumentó 1,7 puntos frente a la semana previa. Los picos se concentran en franjas de la tarde y recordatorios enviados con menos de 12 horas de anticipación.' },
                { role: 'coordinator', author: 'Agente coordinador', time: '09:02', text: 'Respuesta ejecutiva: se recomienda activar confirmación anticipada para citas de alto riesgo, priorizar reagendamiento en sedes Norte y Centro, y monitorear especialidades con mayor no asistencia durante los próximos 7 días.' }
            ]
        },
        pqrd: {
            buttonLabel: 'PQRD',
            summary: 'Escenario de clasificación automática de solicitudes, detección de causas recurrentes y monitoreo del cumplimiento de tiempos de respuesta.',
            metrics: [
                { label: 'PQRD recibidas', value: '3.264', caption: 'Entradas procesadas en el periodo actual.' },
                { label: 'SLA cumplido', value: '91,8 %', caption: 'Casos cerrados dentro del tiempo objetivo.' },
                { label: 'Críticas', value: '184', caption: 'Solicitudes con impacto alto y seguimiento prioritario.' }
            ],
            highlights: [
                'La IA clasifica automáticamente tipo, canal y nivel de criticidad de cada caso.',
                'Las causas recurrentes permiten orientar acciones correctivas sobre procesos y atención.',
                'Los resúmenes ejecutivos aceleran comités de seguimiento y control de SLA.'
            ],
            messages: [
                { role: 'user', author: 'Usuario de negocio', time: '10:10', text: 'Quiero saber cómo van las PQRD del mes, cuáles son las principales causas y dónde estamos incumpliendo tiempos.' },
                { role: 'coordinator', author: 'Agente coordinador', time: '10:10', text: 'Voy a consolidar los datos de PQRD y pedir al agente analítico un resumen de criticidad y cumplimiento.' },
                { role: 'data', author: 'Agente de datos', time: '10:11', text: 'Resultado de consulta:\n- 3.264 PQRD registradas\n- 2.997 cerradas\n- 184 críticas\n- Principales causas: oportunidad de atención, autorizaciones y demoras en respuesta' },
                { role: 'analyst', author: 'Agente analítico', time: '10:11', text: 'Análisis: el 8,2 % presenta riesgo de incumplimiento. Los casos críticos llegan principalmente por canal web y call center. La causa más repetida es oportunidad de atención en consulta especializada.' },
                { role: 'coordinator', author: 'Agente coordinador', time: '10:12', text: 'Resumen para dirección: fortalecer triage automático de PQRD críticas, revisar el flujo de autorizaciones y asignar seguimiento diario a casos con antigüedad mayor a 5 días hábiles.' }
            ]
        },
        operativo: {
            buttonLabel: 'Seguimiento operacional',
            summary: 'Escenario transversal para supervisar demanda, desvíos operativos y alertas tempranas sobre procesos sensibles de la organización.',
            metrics: [
                { label: 'Eventos monitoreados', value: '18.940', caption: 'Registros integrados desde múltiples fuentes.' },
                { label: 'Alertas IA', value: '326', caption: 'Desviaciones detectadas y priorizadas.' },
                { label: 'Procesos críticos', value: '5', caption: 'Frentes con necesidad de intervención inmediata.' }
            ],
            highlights: [
                'La automatización identifica desviaciones de volumen, tiempos y causas con mayor impacto.',
                'Los agentes producen explicaciones ejecutivas para líderes de proceso y equipos técnicos.',
                'La priorización mejora la capacidad de reacción en entornos operativos complejos.'
            ],
            messages: [
                { role: 'user', author: 'Usuario de negocio', time: '11:30', text: 'Necesito una visión general de alertas operativas y qué procesos requieren atención inmediata.' },
                { role: 'coordinator', author: 'Agente coordinador', time: '11:30', text: 'Solicitaré consolidado por proceso, severidad y antigüedad para entregar una priorización ejecutiva.' },
                { role: 'data', author: 'Agente de datos', time: '11:31', text: 'Consulta consolidada:\n- 18.940 eventos monitoreados\n- 326 alertas activas\n- 5 procesos críticos\n- Mayor concentración de alertas: atención al usuario, autorizaciones y cartera' },
                { role: 'analyst', author: 'Agente analítico', time: '11:31', text: 'Se observa aumento de alertas por acumulación de casos y variación en tiempos de respuesta. El patrón más sensible combina alta demanda, rezago operativo y concentración por sede.' },
                { role: 'coordinator', author: 'Agente coordinador', time: '11:32', text: 'Prioridad sugerida: establecer comité corto de seguimiento sobre procesos críticos, activar alertas diarias en sedes con rezago y desplegar monitoreo reforzado para autorizaciones y atención al usuario.' }
            ]
        }
    };

    const automations = {
        citas: {
            buttonLabel: 'Citas médicas',
            title: 'Automatización analítica de citas médicas',
            description: 'Clasificación de agenda, detección de ausentismo, análisis de demanda y recomendaciones de reagendamiento con apoyo de IA.',
            metrics: [
                { label: 'Citas procesadas', value: '12.480', caption: 'Agenda consolidada con trazabilidad por especialidad y sede.' },
                { label: 'Confirmadas', value: '10.302', caption: 'Citas confirmadas o atendidas exitosamente.' },
                { label: 'Ausentes', value: '1.048', caption: 'Casos identificados para campañas de recuperación.' },
                { label: 'Ahorro estimado', value: '22 %', caption: 'Reducción potencial del tiempo operativo de análisis.' }
            ],
            flow: [
                { title: 'Ingesta de agenda', text: 'Se integran citas programadas, sedes, especialidades y estados operativos.' },
                { title: 'Clasificación inteligente', text: 'La IA segmenta por riesgo de ausentismo, criticidad clínica y probabilidad de reagendamiento.' },
                { title: 'Alertamiento', text: 'Se activan recomendaciones para confirmación anticipada y recuperación de cupos.' },
                { title: 'Resumen ejecutivo', text: 'Se produce una síntesis accionable para responsables de operación y coordinación médica.' }
            ],
            narrative: 'La automatización permite pasar de un monitoreo descriptivo a una gestión proactiva. El sistema detecta patrones de ausentismo por sede y especialidad, resume causas frecuentes y propone acciones de confirmación o reasignación de cupos.',
            recommendations: [
                'Priorizar campañas de recordatorio para especialidades con ausentismo superior al promedio.',
                'Monitorear diariamente sedes con mayor concentración de reagendamientos.',
                'Cruzar disponibilidad de agenda con demanda histórica para balancear capacidad.'
            ]
        },
        pqrd: {
            buttonLabel: 'PQRD',
            title: 'Automatización de clasificación y seguimiento de PQRD',
            description: 'Procesamiento inteligente de solicitudes para medir cantidades, clasificar criticidad, identificar causas y controlar cumplimiento de SLA.',
            metrics: [
                { label: 'Solicitudes', value: '3.264', caption: 'Casos integrados desde web, presencial y call center.' },
                { label: 'Clasificadas IA', value: '96 %', caption: 'Precisión operativa del motor de categorización.' },
                { label: 'SLA cumplido', value: '91,8 %', caption: 'Nivel de cumplimiento en tiempos objetivo.' },
                { label: 'Riesgo alto', value: '184', caption: 'Casos que requieren seguimiento preferente.' }
            ],
            flow: [
                { title: 'Recepción multicanal', text: 'Se reciben solicitudes desde canales digitales y presenciales.' },
                { title: 'Triage automático', text: 'La IA clasifica por tipo, causa, severidad, canal y riesgo de incumplimiento.' },
                { title: 'Priorización', text: 'El sistema destaca casos críticos y agrupaciones recurrentes por causa o sede.' },
                { title: 'Seguimiento ejecutivo', text: 'Se genera un resumen con backlog, SLA, causas y recomendaciones de mejora.' }
            ],
            narrative: 'El flujo automatizado reduce tiempo manual de clasificación y permite identificar con mayor rapidez los casos que amenazan el SLA. Además, facilita la lectura ejecutiva sobre volumen, criticidad y oportunidades de mejora en servicio.',
            recommendations: [
                'Implementar seguimiento diario para PQRD con antigüedad superior a 5 días hábiles.',
                'Crear reglas de atención reforzada para causas de oportunidad y autorizaciones.',
                'Consolidar reportes semanales para líderes de experiencia y calidad.'
            ]
        },
        operativo: {
            buttonLabel: 'Seguimiento operacional',
            title: 'Automatización de monitoreo y alertas operativas',
            description: 'Consolidación de eventos empresariales para detectar desviaciones, producir alertas y entregar contexto ejecutivo a responsables de proceso.',
            metrics: [
                { label: 'Eventos', value: '18.940', caption: 'Operaciones monitoreadas desde distintas fuentes.' },
                { label: 'Alertas', value: '326', caption: 'Desviaciones detectadas mediante reglas y análisis IA.' },
                { label: 'Procesos críticos', value: '5', caption: 'Frentes priorizados por impacto y tendencia.' },
                { label: 'Tiempo ganado', value: '31 %', caption: 'Reducción estimada en monitoreo manual.' }
            ],
            flow: [
                { title: 'Integración de fuentes', text: 'Se unifican eventos transaccionales, indicadores y estados de proceso.' },
                { title: 'Detección de anomalías', text: 'La IA identifica picos, rezagos, desbalances y procesos fuera de umbral.' },
                { title: 'Priorización de alertas', text: 'Cada desviación se califica por severidad, criticidad y riesgo operacional.' },
                { title: 'Comunicación accionable', text: 'Se produce una salida resumida con foco en intervención y seguimiento.' }
            ],
            narrative: 'Esta automatización aporta visibilidad transversal sobre la operación. Permite descubrir procesos con riesgo creciente, ordenar la atención de alertas y respaldar decisiones con argumentos claros y medibles.',
            recommendations: [
                'Concentrar revisión diaria en procesos con tendencia negativa sostenida.',
                'Definir umbrales dinámicos por sede o línea de servicio.',
                'Integrar alertas con tableros ejecutivos para seguimiento continuo.'
            ]
        }
    };

    const chartContexts = {
        citas: {
            buttonLabel: 'Citas médicas',
            trend: {
                months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                volume: [1820, 1915, 2050, 2140, 2210, 2345],
                target: [1750, 1800, 1850, 1900, 1950, 2000]
            },
            breakdown: {
                categories: ['Confirmadas', 'Reagendadas', 'Ausentes', 'Canceladas'],
                resolved: [5300, 1240, 420, 310],
                pending: [650, 210, 140, 95]
            },
            compliance: {
                sla: 92,
                channels: [
                    { value: 46, name: 'Call center' },
                    { value: 28, name: 'Web' },
                    { value: 18, name: 'WhatsApp' },
                    { value: 8, name: 'Presencial' }
                ]
            }
        },
        pqrd: {
            buttonLabel: 'PQRD',
            trend: {
                months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                volume: [430, 468, 502, 544, 561, 589],
                target: [480, 480, 500, 500, 520, 520]
            },
            breakdown: {
                categories: ['Oportunidad', 'Autorizaciones', 'Atención', 'Información'],
                resolved: [742, 616, 584, 430],
                pending: [92, 86, 74, 48]
            },
            compliance: {
                sla: 88,
                channels: [
                    { value: 39, name: 'Web' },
                    { value: 27, name: 'Call center' },
                    { value: 21, name: 'Presencial' },
                    { value: 13, name: 'Correo' }
                ]
            }
        },
        operativo: {
            buttonLabel: 'Seguimiento operacional',
            trend: {
                months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                volume: [2680, 2795, 2870, 3015, 3180, 3360],
                target: [2500, 2550, 2600, 2700, 2800, 2900]
            },
            breakdown: {
                categories: ['Autorizaciones', 'Atención usuario', 'Cartera', 'Facturación'],
                resolved: [980, 860, 730, 640],
                pending: [146, 124, 118, 90]
            },
            compliance: {
                sla: 94,
                channels: [
                    { value: 34, name: 'Integración interna' },
                    { value: 26, name: 'Correo' },
                    { value: 24, name: 'Mesa de ayuda' },
                    { value: 16, name: 'Carga batch' }
                ]
            }
        }
    };

    const state = {
        activeScenario: 'citas',
        activeAutomation: 'citas',
        activeChartContext: 'citas',
        chatTimers: []
    };

    const scenarioButtonsContainer = document.getElementById('scenarioButtons');
    const scenarioMetricsContainer = document.getElementById('scenarioMetrics');
    const scenarioSummary = document.getElementById('scenarioSummary');
    const scenarioHighlights = document.getElementById('scenarioHighlights');
    const chatMessagesContainer = document.getElementById('chatMessages');
    const playScenarioButton = document.getElementById('playScenarioButton');

    const automationButtonsContainer = document.getElementById('automationButtons');
    const automationTitle = document.getElementById('automationTitle');
    const automationDescription = document.getElementById('automationDescription');
    const automationMetricsContainer = document.getElementById('automationMetrics');
    const automationFlowContainer = document.getElementById('automationFlow');
    const automationNarrative = document.getElementById('automationNarrative');
    const automationRecommendations = document.getElementById('automationRecommendations');

    const chartContextButtonsContainer = document.getElementById('chartContextButtons');

    const charts = {
        volume: echarts.init(document.getElementById('volumeChart')),
        breakdown: echarts.init(document.getElementById('breakdownChart')),
        compliance: echarts.init(document.getElementById('complianceChart'))
    };

    function createSegmentButtons(source, container, activeKey, onClick) {
        container.innerHTML = '';

        Object.entries(source).forEach(([key, item]) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `segment-button${key === activeKey ? ' is-active' : ''}`;
            button.textContent = item.buttonLabel;
            button.addEventListener('click', () => onClick(key));
            container.appendChild(button);
        });
    }

    function renderMetricCards(items, container) {
        container.innerHTML = items.map((item) => `
            <article class="metric-card">
                <div class="metric-card__label">${item.label}</div>
                <div class="metric-card__value">${item.value}</div>
                <p class="metric-card__caption">${item.caption}</p>
            </article>
        `).join('');
    }

    function renderScenarioDetails() {
        const scenario = scenarios[state.activeScenario];
        renderMetricCards(scenario.metrics, scenarioMetricsContainer);

        scenarioSummary.textContent = scenario.summary;
        scenarioHighlights.innerHTML = `
            <div class="highlight-list">
                ${scenario.highlights.map((highlight) => `<div class="highlight-item">${highlight}</div>`).join('')}
            </div>
        `;

        renderChatPlaceholder();
        createSegmentButtons(scenarios, scenarioButtonsContainer, state.activeScenario, (key) => {
            state.activeScenario = key;
            renderScenarioDetails();
        });
    }

    function clearChatTimers() {
        state.chatTimers.forEach((timerId) => clearTimeout(timerId));
        state.chatTimers = [];
    }

    function renderChatPlaceholder() {
        clearChatTimers();
        const currentScenario = scenarios[state.activeScenario];
        chatMessagesContainer.innerHTML = `
            <div class="chat-placeholder">
                <div>
                    <div class="text-lg font-bold text-white">Escenario listo: ${currentScenario.buttonLabel}</div>
                    <p class="mt-3 text-sm leading-7 text-slate-300">
                        Pulsa <strong>Reproducir demo</strong> para visualizar la conversación entre agentes
                        usando un caso de negocio con datos simulados.
                    </p>
                </div>
            </div>
        `;
    }

    function getBubbleClass(role) {
        switch (role) {
            case 'user':
                return 'chat-bubble--user';
            case 'data':
                return 'chat-bubble--data';
            case 'analyst':
                return 'chat-bubble--analyst';
            default:
                return 'chat-bubble--coordinator';
        }
    }

    function renderMessage(message) {
        const row = document.createElement('div');
        row.className = `chat-row${message.role === 'user' ? ' chat-row--right' : ''}`;

        row.innerHTML = `
            <article class="chat-bubble ${getBubbleClass(message.role)}">
                <div class="chat-role">
                    <span>${message.author}</span>
                    <span class="chat-role__time">${message.time}</span>
                </div>
                <div class="chat-text">${message.text}</div>
            </article>
        `;

        chatMessagesContainer.appendChild(row);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    function playScenario() {
        clearChatTimers();
        chatMessagesContainer.innerHTML = '';

        const scenario = scenarios[state.activeScenario];
        scenario.messages.forEach((message, index) => {
            const timerId = window.setTimeout(() => {
                renderMessage(message);
            }, index * 850);
            state.chatTimers.push(timerId);
        });
    }

    function renderAutomationDetails() {
        const automation = automations[state.activeAutomation];

        automationTitle.textContent = automation.title;
        automationDescription.textContent = automation.description;
        automationNarrative.textContent = automation.narrative;
        renderMetricCards(automation.metrics, automationMetricsContainer);

        automationFlowContainer.innerHTML = automation.flow.map((step, index) => `
            <div class="flow-step">
                <span class="flow-bullet">${index + 1}</span>
                <div class="flow-content">
                    <div class="flow-content__title">${step.title}</div>
                    <div class="flow-content__text">${step.text}</div>
                </div>
            </div>
        `).join('');

        automationRecommendations.innerHTML = automation.recommendations.map((recommendation) => `
            <li class="recommendation-item">${recommendation}</li>
        `).join('');

        createSegmentButtons(automations, automationButtonsContainer, state.activeAutomation, (key) => {
            state.activeAutomation = key;
            renderAutomationDetails();
        });
    }

    function updateCharts() {
        const context = chartContexts[state.activeChartContext];

        charts.volume.setOption({
            tooltip: { trigger: 'axis' },
            legend: { data: ['Volumen', 'Meta'], top: 0 },
            grid: { left: 48, right: 24, top: 52, bottom: 40 },
            xAxis: {
                type: 'category',
                data: context.trend.months,
                boundaryGap: false,
                axisLine: { lineStyle: { color: '#cbd5e1' } },
                axisLabel: { color: '#475569' }
            },
            yAxis: {
                type: 'value',
                axisLabel: { color: '#475569' },
                splitLine: { lineStyle: { color: '#e2e8f0' } }
            },
            series: [
                {
                    name: 'Volumen',
                    type: 'line',
                    smooth: true,
                    data: context.trend.volume,
                    areaStyle: { opacity: 0.18 },
                    lineStyle: { width: 3 },
                    symbolSize: 8
                },
                {
                    name: 'Meta',
                    type: 'line',
                    smooth: true,
                    data: context.trend.target,
                    lineStyle: { type: 'dashed', width: 2 },
                    symbolSize: 6
                }
            ]
        });

        charts.breakdown.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['Gestionado', 'Pendiente'], top: 0 },
            grid: { left: 110, right: 24, top: 52, bottom: 24 },
            xAxis: {
                type: 'value',
                axisLabel: { color: '#475569' },
                splitLine: { lineStyle: { color: '#e2e8f0' } }
            },
            yAxis: {
                type: 'category',
                data: context.breakdown.categories,
                axisLabel: { color: '#334155' }
            },
            series: [
                {
                    name: 'Gestionado',
                    type: 'bar',
                    stack: 'total',
                    borderRadius: [0, 10, 10, 0],
                    data: context.breakdown.resolved
                },
                {
                    name: 'Pendiente',
                    type: 'bar',
                    stack: 'total',
                    borderRadius: [0, 10, 10, 0],
                    data: context.breakdown.pending
                }
            ]
        });

        charts.compliance.setOption({
            tooltip: { trigger: 'item' },
            title: [
                {
                    text: `${context.compliance.sla}%`,
                    left: '25%',
                    top: '39%',
                    textAlign: 'center',
                    textStyle: {
                        fontSize: 28,
                        fontWeight: 800,
                        color: '#0f172a'
                    }
                },
                {
                    text: 'Cumplimiento SLA',
                    left: '25%',
                    top: '52%',
                    textAlign: 'center',
                    textStyle: {
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#64748b'
                    }
                }
            ],
            series: [
                {
                    name: 'SLA',
                    type: 'pie',
                    radius: ['48%', '65%'],
                    center: ['25%', '50%'],
                    silent: true,
                    label: { show: false },
                    data: [
                        { value: context.compliance.sla, name: 'Cumplido' },
                        { value: 100 - context.compliance.sla, name: 'Pendiente' }
                    ]
                },
                {
                    name: 'Canal',
                    type: 'pie',
                    radius: ['35%', '62%'],
                    center: ['74%', '50%'],
                    label: {
                        formatter: '{b}\n{d}%',
                        color: '#334155',
                        fontSize: 11
                    },
                    data: context.compliance.channels
                }
            ]
        });
    }

    function renderChartContextButtons() {
        createSegmentButtons(chartContexts, chartContextButtonsContainer, state.activeChartContext, (key) => {
            state.activeChartContext = key;
            renderChartContextButtons();
            updateCharts();
        });
    }

    playScenarioButton.addEventListener('click', playScenario);

    renderScenarioDetails();
    renderAutomationDetails();
    renderChartContextButtons();
    updateCharts();

    window.addEventListener('resize', () => {
        Object.values(charts).forEach((chart) => chart.resize());
    });
});
