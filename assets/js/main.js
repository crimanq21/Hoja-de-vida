document.addEventListener('DOMContentLoaded', () => {
            const canvas = document.getElementById('skillsChart');
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['Ingeniería de Datos', 'BI / Dashboards', 'PL/SQL / BD', 'ETL / Integración', 'IA aplicada', 'Análisis estadístico'],
                    datasets: [{
                        label: 'Nivel profesional',
                        data: [95, 92, 95, 93, 88, 90],
                        backgroundColor: 'rgba(20, 184, 166, 0.18)',
                        borderColor: 'rgba(20, 184, 166, 1)',
                        pointBackgroundColor: 'rgba(20, 184, 166, 1)',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            min: 0,
                            max: 100,
                            ticks: {
                                stepSize: 20,
                                backdropColor: 'transparent',
                                color: '#64748b'
                            },
                            grid: { color: 'rgba(100, 116, 139, 0.18)' },
                            angleLines: { color: 'rgba(100, 116, 139, 0.18)' },
                            pointLabels: {
                                color: '#0f172a',
                                font: { size: 12, weight: '600' }
                            }
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: (context) => `${context.label}: ${context.raw}/100`
                            }
                        }
                    }
                }
            });
        });
