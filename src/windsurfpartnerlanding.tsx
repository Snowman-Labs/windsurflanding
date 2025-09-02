import React, { useMemo, useState } from 'react'

interface FormState {
  companyName: string
  revenueRange: string
  teamSizeRange: string
  message: string
}

const revenueOptions = [
  { value: 'ate-10m', label: 'Até R$ 10 milhões/ano' },
  { value: '10-50m', label: 'R$ 10–50 milhões/ano' },
  { value: '50-200m', label: 'R$ 50–200 milhões/ano' },
  { value: '200m-1b', label: 'R$ 200 milhões–R$ 1 bilhão/ano' },
  { value: 'acima-1b', label: 'Acima de R$ 1 bilhão/ano' },
]

const teamSizeOptions = [
  { value: 'ate-30', label: 'Até 30' },
  { value: '31-50', label: '31 a 50' },
  { value: '51-100', label: '51 a 100' },
  { value: '100-200', label: '100 a 200' },
  { value: 'acima-200', label: 'Acima de 200' },
]

const WindsurfPartnerLanding: React.FC = () => {
  const [form, setForm] = useState<FormState>({ companyName:'', revenueRange:'', teamSizeRange:'', message:'' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const canSubmit = useMemo(()=> form.companyName && form.revenueRange && form.teamSizeRange, [form])

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((f)=>({ ...f, [name]: value }))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitted(false)
    setError('')

    try {
      const response = await fetch('/api/pipefy/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pipeId: 306642120,
          title: `Lead Windsurf - ${form.companyName}`,
          fields: [
            { id: 'nome_da_empresa', value: form.companyName },
            { id: 'faturamento', value: form.revenueRange },
            { id: 'tamanho_do_time', value: form.teamSizeRange },
            { id: 'como_podemos_te_ajudar_fale_mais_sobre_o_seu_momento_e_time', value: form.message }
          ]
        })
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Card criado no Pipefy:', result)
        setSubmitted(true)
        setForm({ companyName: '', revenueRange: '', teamSizeRange: '', message: '' })
      } else {
        const error = await response.json()
        setError(error.error || 'Erro ao enviar formulário')
      }
    } catch (err) {
      console.error('Erro na requisição:', err)
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      {/* LOGOS AT TOP */}
      <header style={{ padding: '24px 0' }}>
        <div className="container-modern">
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'40px' }}>
            <img src="/logos/windsurf-white-wordmark.png" alt="Windsurf" style={{ height:'clamp(36px, 6vw, 64px)', display:'block' }} />
            <img src="/logos/logo-snow-ai-fundo-escuro.svg" alt="Snowman Labs" style={{ height:'clamp(36px, 6vw, 64px)', display:'block' }} />
          </div>
        </div>
      </header>

      {/* HERO ULTRA MODERN */}
      <div className="hero-dark">
        <div className="container-modern">
          <div className="hero-content">
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h1 className="hero-title">
                Acelere seu time com o Windsurf
              </h1>
              <p className="hero-subtitle">
                Licenças corporativas para empresas 100+ devs. Treinamentos práticos para times menores. 
                Metodologias próprias e acesso direto ao time de engenharia da Windsurf.
              </p>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href="#contato" className="cta-primary-modern">Solicitar Proposta</a>
                <a href="#contato" className="cta-secondary-modern">Agendar Diagnóstico</a>
              </div>
              <div className="stats-modern">
                <div className="stat-item">
                  <span className="stat-number">1M+</span>
                  <span className="stat-label">Usuários</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">4K+</span>
                  <span className="stat-label">Clientes Enterprise</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">94%</span>
                  <span className="stat-label">Código IA (máx.)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DELIVERABLES MODERN */}
      <div className="section-modern">
        <div className="container-modern">
          <h2 style={{ fontSize:'clamp(2rem, 5vw, 3rem)', fontWeight:900, textAlign:'center', marginBottom:'3rem', color:'var(--text-white)' }}>
            O que entregamos
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:'1.5rem', justifyContent:'center', alignItems:'stretch', justifyItems:'stretch', maxWidth:'1100px', margin:'0 auto', padding:'0 1rem' }}>
            <div className="glass-card">
              <h3 style={{ fontSize:'1.5rem', fontWeight:700, marginBottom:'1rem', color:'var(--text-white)' }}>Licenciamento Enterprise</h3>
              <p style={{ color:'var(--text-gray)', lineHeight:1.6 }}>Operamos licenças para organizações com <strong style={{ color:'var(--accent-blue)' }}>100+ desenvolvedores</strong>, com onboarding assistido, governança e suporte executivo.</p>
            </div>
            <div className="glass-card">
              <h3 style={{ fontSize:'1.5rem', fontWeight:700, marginBottom:'1rem', color:'var(--text-white)' }}>Treinamentos e Adoção</h3>
              <p style={{ color:'var(--text-gray)', lineHeight:1.6 }}>Para times menores que 100 devs, treinamentos intensivos focados em resultados e ramp-up de produtividade.</p>
            </div>
            <div className="glass-card">
              <h3 style={{ fontSize:'1.5rem', fontWeight:700, marginBottom:'1rem', color:'var(--text-white)' }}>Metodologias Proprietárias</h3>
              <p style={{ color:'var(--text-gray)', lineHeight:1.6 }}>Frameworks de <strong style={{ color:'var(--accent-blue)' }}>engenharia auxiliada por IA</strong>, medição de impacto, padrões de segurança e SDLC com IA.</p>
            </div>
          </div>
        </div>
      </div>

      {/* METHOD MODERN */}
      <div className="section-modern section-dark">
        <div className="container-modern">
          <h2 style={{ fontSize:'clamp(2rem, 5vw, 3rem)', fontWeight:900, textAlign:'center', marginBottom:'3rem', color:'var(--text-white)' }}>
            Nossa metodologia de adoção
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px,1fr))', gap:'1.5rem', justifyContent:'center', alignItems:'stretch', justifyItems:'stretch', maxWidth:'1100px', margin:'0 auto', padding:'0 1rem' }}>
            <div className="glass-card">
              <div style={{ fontSize:'2rem', fontWeight:900, color:'var(--accent-blue)', marginBottom:'1rem' }}>01</div>
              <h4 style={{ fontSize:'1.2rem', fontWeight:700, marginBottom:'0.5rem', color:'var(--text-white)' }}>Diagnóstico</h4>
              <p style={{ color:'var(--text-gray)', fontSize:'0.9rem', lineHeight:1.5 }}>Mapeamos cenário, repositórios, SDLC, riscos e objetivos.</p>
            </div>
            <div className="glass-card">
              <div style={{ fontSize:'2rem', fontWeight:900, color:'var(--accent-blue-light)', marginBottom:'1rem' }}>02</div>
              <h4 style={{ fontSize:'1.2rem', fontWeight:700, marginBottom:'0.5rem', color:'var(--text-white)' }}>Piloto guiado</h4>
              <p style={{ color:'var(--text-gray)', fontSize:'0.9rem', lineHeight:1.5 }}>Escopo e metas (velocity, lead time, qualidade) com Windsurf.</p>
            </div>
            <div className="glass-card">
              <div style={{ fontSize:'2rem', fontWeight:900, color:'var(--accent-blue)', marginBottom:'1rem' }}>03</div>
              <h4 style={{ fontSize:'1.2rem', fontWeight:700, marginBottom:'0.5rem', color:'var(--text-white)' }}>Aceleração</h4>
              <p style={{ color:'var(--text-gray)', fontSize:'0.9rem', lineHeight:1.5 }}>Rollout por tribos, governança de prompts e integrações via MCP.</p>
            </div>
            <div className="glass-card">
              <div style={{ fontSize:'2rem', fontWeight:900, color:'var(--accent-blue-light)', marginBottom:'1rem' }}>04</div>
              <h4 style={{ fontSize:'1.2rem', fontWeight:700, marginBottom:'0.5rem', color:'var(--text-white)' }}>Escala e ROI</h4>
              <p style={{ color:'var(--text-gray)', fontSize:'0.9rem', lineHeight:1.5 }}>Medimos impacto e consolidamos práticas para ganhos sustentáveis.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CASES MODERN */}
      <div className="section-modern">
        <div className="container-modern">
          <h2 style={{ fontSize:'clamp(2rem, 5vw, 3rem)', fontWeight:900, textAlign:'center', marginBottom:'2rem', color:'var(--text-white)' }}>
            Casos e frentes que habilitamos
          </h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:'1.5rem', padding:'0 1rem' }}>
            <div className="glass-card">
              <h3 style={{ fontSize:'1.5rem', fontWeight:700, marginBottom:'1rem', color:'var(--text-white)' }}>Modernização e Entrega Rápida</h3>
              <p style={{ color:'var(--text-gray)', lineHeight:1.6 }}>Prototipagem acelerada, refactors assistidos, menos boilerplate.</p>
            </div>
            <div className="glass-card">
              <h3 style={{ fontSize:'1.5rem', fontWeight:700, marginBottom:'1rem', color:'var(--text-white)' }}>Qualidade e Segurança</h3>
              <p style={{ color:'var(--text-gray)', lineHeight:1.6 }}>Testes guiados por IA, linting automático, políticas e rastreabilidade.</p>
            </div>
            <div className="glass-card">
              <h3 style={{ fontSize:'1.5rem', fontWeight:700, marginBottom:'1rem', color:'var(--text-white)' }}>Integrações e Automação</h3>
              <p style={{ color:'var(--text-gray)', lineHeight:1.6 }}>MCP para ferramentas internas, previews automáticos, comandos e pipelines.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FORM MODERN */}
      <div id="contato" className="section-modern" style={{ background: 'rgba(10,10,10,0.95)' }}>
        <div className="container-modern">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'start', justifyContent:'center', maxWidth: '680px', margin: '0 auto' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '1rem', color: 'var(--text-white)' }}>
                Fale com nosso time
              </h2>
              <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
                Preencha os campos e retornaremos com uma proposta sob medida. Se preferir, agendamos um diagnóstico inicial sem custo.
              </p>
              <form onSubmit={handleSubmit} className="form-modern">
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                  <div>
                    <label htmlFor="companyName" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Nome da empresa *
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      value={form.companyName}
                      onChange={onChange}
                      placeholder="Ex: Acme Corp"
                      className="input-modern"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="revenueRange" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Faturamento anual *
                    </label>
                    <select
                      id="revenueRange"
                      name="revenueRange"
                      value={form.revenueRange}
                      onChange={onChange}
                      className="input-modern"
                      required
                    >
                      <option value="">Selecione uma faixa</option>
                      <option value="Até 10 milhões ano">Até 10 milhões ano</option>
                      <option value="Entre 11 milhões a 30 milhões">Entre 11 milhões a 30 milhões</option>
                      <option value="Entre 31 milhões a 80 milhões">Entre 31 milhões a 80 milhões</option>
                      <option value="Entre 81 milhões a 200 milhões">Entre 81 milhões a 200 milhões</option>
                      <option value="Acima de 200 milhões ano">Acima de 200 milhões ano</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="teamSizeRange" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Tamanho do time de tecnologia *
                    </label>
                    <select
                      id="teamSizeRange"
                      name="teamSizeRange"
                      value={form.teamSizeRange}
                      onChange={onChange}
                      className="input-modern"
                      required
                    >
                      <option value="">Selecione uma faixa</option>
                      <option value="Até 10 Desenvolvedores,">Até 10 Desenvolvedores</option>
                      <option value="Entre 11 a 30,">Entre 11 a 30</option>
                      <option value="Entre 31 a 50,">Entre 31 a 50</option>
                      <option value="Entre 51 a 100,">Entre 51 a 100</option>
                      <option value="Entre 101 a 200,">Entre 101 a 200</option>
                      <option value="Acima de 200 Desenvolvedores">Acima de 200 Desenvolvedores</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-white)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Mensagem (opcional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={onChange}
                      placeholder="Conte-nos sobre seus objetivos, desafios ou contexto específico..."
                      rows={4}
                      className="input-modern"
                      style={{ resize: 'vertical', minHeight: '100px' }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{ 
                      background: submitting ? '#6b7280' : '#D4AF37', 
                      color: '#0B0F16', 
                      padding: '16px 32px', 
                      borderRadius: '12px', 
                      border: 'none', 
                      fontSize: '18px', 
                      fontWeight: '700', 
                      cursor: submitting ? 'not-allowed' : 'pointer', 
                      width: '100%',
                      marginTop: '16px',
                      opacity: submitting ? 0.7 : 1
                    }}
                  >
                    {submitting ? 'Enviando...' : 'Enviar Solicitação'}
                  </button>

                  {error && (
                    <div style={{ 
                      marginTop: '12px', 
                      padding: '12px', 
                      background: '#ef4444', 
                      color: '#fff', 
                      borderRadius: '8px', 
                      fontSize: '14px' 
                    }}>
                      ⚠️ {error}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ SECTION (after form) */}
      <div className="section-modern">
        <div className="container-modern">
          <h2 style={{ fontSize:'clamp(2rem, 5vw, 3rem)', fontWeight:900, textAlign:'center', marginBottom:'2rem', color:'var(--text-white)' }}>
            Perguntas frequentes
          </h2>
          <div className="glass-card" style={{ width:'100%', maxWidth:'900px', margin:'0 auto' }}>
            <div style={{ display:'grid', gap:'1rem' }}>
              <div>
                <h4 style={{ fontSize:'1rem', fontWeight:700, color:'var(--accent-blue)', margin:0 }}>Posso usar com qualquer linguagem?</h4>
                <p style={{ color:'var(--text-gray)', margin:'4px 0 0' }}>Sim. Grande parte das linguagens e stacks modernos são suportados.</p>
              </div>
              <div>
                <h4 style={{ fontSize:'1rem', fontWeight:700, color:'var(--accent-blue)', margin:0 }}>Funciona com JetBrains?</h4>
                <p style={{ color:'var(--text-gray)', margin:'4px 0 0' }}>Sim. Há suporte com plugin dedicado para JetBrains.</p>
              </div>
              <div>
                <h4 style={{ fontSize:'1rem', fontWeight:700, color:'var(--accent-blue)', margin:0 }}>Preciso inserir meus tokens de LLM?</h4>
                <p style={{ color:'var(--text-gray)', margin:'4px 0 0' }}>Não. O Windsurf já vem com modelos integrados. Nada de setup complexo de chaves.</p>
              </div>
              <div>
                <h4 style={{ fontSize:'1rem', fontWeight:700, color:'var(--accent-blue)', margin:0 }}>Tenho métricas da equipe?</h4>
                <p style={{ color:'var(--text-gray)', margin:'4px 0 0' }}>Sim. No plano Enterprise é possível medir adoção e produtividade do time.</p>
              </div>
              <div>
                <h4 style={{ fontSize:'1rem', fontWeight:700, color:'var(--accent-blue)', margin:0 }}>Quais os diferenciais do Windsurf?</h4>
                <ul style={{ color:'var(--text-gray)', margin:'6px 0 0', paddingLeft:'18px' }}>
                  <li>IDE nativo de IA que mantém o dev em flow (Cascade).</li>
                  <li>Integração MCP para conectar ferramentas e processos corporativos.</li>
                  <li>Personalização com base no seu código para reduzir edições e alucinações.</li>
                  <li>Tooling “shift-left” para aplicar boas práticas ao longo do SDLC.</li>
                  <li>Compatibilidade ampla com stacks existentes e opção AI‑native.</li>
                  <li>Segurança e compliance de nível enterprise (ex.: SOC2, FedRAMP, HIPAA).</li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize:'1rem', fontWeight:700, color:'var(--accent-blue)', margin:0 }}>Ainda com dúvida?</h4>
                <p style={{ color:'var(--text-gray)', margin:'4px 0 0' }}>Fale conosco agora mesmo: <a href="#contato" style={{ color:'var(--accent-blue)' }}>enviar solicitação</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER MODERN */}
      <div style={{ padding: '4rem 0', background: '#000000', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container-modern">
          <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', textAlign:'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-white)', marginBottom: '0.5rem', textTransform:'none' }}>
              Parceiro oficial windsurf
            </div>
            <div style={{ color: 'var(--text-gray)' }}>
              Brasil • Atendimento corporativo
            </div>
            <div style={{ color: 'var(--text-gray)', fontSize: '0.8rem' }}>
              Snowman Labs LTDA • CNPJ: 16.934.470/0001-62
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WindsurfPartnerLanding
