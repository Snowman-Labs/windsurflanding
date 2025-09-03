import React, { useState } from 'react'
import './styles.css'
import Hero from './components/Hero'
import PageSection from './components/PageSection'
import KpiRow from './components/KpiRow'
import TwoColFeature from './components/TwoColFeature'
import CheckGrid from './components/CheckGrid'
import Timeline from './components/Timeline'
import Marquee from './components/Marquee'
import DividerGlow from './components/DividerGlow'
import FAQAccordion from './components/FAQAccordion'
// import PricingBanner from './components/PricingBanner' // mantido comentado para uso futuro

const TreinamentoPage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    empresa: '',
    cargo: '',
    telefone: '',
    tamanhoTime: '',
    observacoes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/.netlify/functions/pipefy-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pipeId: 306642120,
          title: `Interesse em Treinamento - ${formData.nome} (${formData.empresa})`,
          fields: [
            { id: 'nome_completo', value: formData.nome },
            { id: 'email', value: formData.email },
            { id: 'empresa', value: formData.empresa },
            { id: 'cargo', value: formData.cargo },
            { id: 'telefone', value: formData.telefone },
            { id: 'tamanho_do_time', value: formData.tamanhoTime },
            { id: 'tipo_de_interesse', value: 'Treinamento Oficial Windsurf' },
            { id: 'observa_es', value: formData.observacoes }
          ]
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          nome: '', email: '', empresa: '', cargo: '', telefone: '', tamanhoTime: '', observacoes: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
      {/* HEADER */}
      <div style={{ padding: '2rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container-modern">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <a href="/" style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-white)', textDecoration: 'none' }}>
              Snowman Labs
            </a>
            <a href="/" className="cta-secondary-modern" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
              ← Voltar
            </a>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <Hero
        title={<>
          Nosso <span style={{ color: 'var(--accent-blue)' }}>treinamento</span>
        </>}
        subtitle={<>
          Capacitação completa para equipes de desenvolvimento com metodologia proprietária e acompanhamento por 3 meses
        </>}
      />

      {/* SOCIAL PROOF MARQUEE */}
      <PageSection paddingY="1rem 2rem" center>
        <Marquee
          items={[
            'Lead time ↓ 30–50%',
            'Throughput ↑ 25–40%',
            'Defeitos ↓ 20–35%',
            'Ramp-up ↓ 30–60%',
            'Playbooks proprietários',
            'Guardrails e compliance',
            'Dashboards DORA/ROI',
          ]}
          speed={70}
        />
      </PageSection>

      {/* DETALHES DO TREINAMENTO */}
      <div className="section-modern">
        <div className="container-modern">
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, textAlign: 'center', marginBottom: '2rem', color: 'var(--text-white)' }}>
              Como funciona o treinamento
            </h2>

            <Timeline
              steps={[
                {
                  title: '1º mês — Treinamento intensivo',
                  items: [
                    'Sessões remotas ao vivo com especialistas',
                    'Workshops práticos com projetos reais',
                    'Metodologias proprietárias de adoção',
                    'Setup e configuração personalizada',
                    'Baseline e primeiras métricas de produtividade',
                  ],
                },
                {
                  title: '2º–3º mês — Acompanhamento e mentoria',
                  items: [
                    'Sprints com rituais IA-first',
                    'Mentorias quinzenais e office-hours',
                    'Ajustes na metodologia aplicada',
                    'Análise contínua de métricas e ROI',
                    'Consolidação das melhores práticas',
                  ],
                },
              ]}
            />
            <div style={{ height: '1rem' }} />

            <DividerGlow />

            {/* BENEFÍCIOS (sem cards) */}
            <PageSection title="O que você ganha" paddingY="0 0 2rem" center>
              <CheckGrid
                columns={2}
                center
                items={[
                  'Aumento médio de 40% na velocidade de desenvolvimento',
                  'Frameworks proprietários de engenharia com IA',
                  'Políticas e governança para uso seguro de IA',
                  'Acompanhamento de ROI e impacto mensurável',
                ]}
              />
            </PageSection>

            {/* POR QUE AGORA */}
            <PageSection title="Por que agora" paddingY="0 0 2rem" center>
              <ul style={{ color: 'var(--text-gray)', lineHeight: 1.8, margin: 0, paddingLeft: '1.2rem', textAlign: 'center', listStylePosition: 'inside' }}>
                <li>IA já é vantagem competitiva. Sem método, vira risco e retrabalho.</li>
                <li>Sua concorrência já está reduzindo lead time e custo de mudanças.</li>
                <li>O Board quer visibilidade e métricas. Nós entregamos ambos.</li>
              </ul>
            </PageSection>

            <DividerGlow />

            {/* RESULTADOS EM 90 DIAS */}
            <PageSection title="Resultados tangíveis em 90 dias" paddingY="0 0 2rem" center>
              <KpiRow items={[
                { label: 'redução no lead time', value: '30–50%' },
                { label: 'aumento no throughput', value: '25–40%' },
                { label: 'menos defeitos', value: '20–35%' },
                { label: 'ramp-up reduzido', value: '30–60%' },
              ]} />
              <p style={{ color:'var(--text-gray)', textAlign:'center', marginTop: '0.5rem' }}>Padronização de prompts e Definition of Done com IA</p>
            </PageSection>

            {/* O QUE ENTREGAMOS (OUTPUTS) */}
            <PageSection title="O que entregamos" paddingY="0 0 2rem" center>
              <CheckGrid
                columns={2}
                center
                items={[
                  'Biblioteca de prompts, padrões de código e checklists por tribo',
                  'Pipelines com validações automatizadas e guardrails',
                  'Métricas e dashboards (Lead Time, MTTR, DORA)',
                  'Repositório de exemplos “prontos para copiar e colar”',
                  'Playbooks: modernização, testes, automação via MCP, refactors e segurança',
                ]}
              />
            </PageSection>

            <DividerGlow />

            {/* PARA QUEM É / PRÉ-REQUISITOS / FORMATO (sem cards) */}
            <PageSection paddingY="0 0 3rem" center>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '3rem' }}>
                <div>
                  <h4 style={{ color:'var(--text-white)', fontWeight:900, marginBottom:'1rem', textAlign:'center' }}>Para quem é</h4>
                  <CheckGrid columns={1} center items={[ 'EMs, Tech Leads, Staff+ e Devs Sêniores', 'Times com 6 a 100+ devs', 'Empresas com backlog ativo e metas agressivas' ]} />
                </div>
                <div>
                  <h4 style={{ color:'var(--text-white)', fontWeight:900, marginBottom:'1rem', textAlign:'center' }}>Pré-requisitos</h4>
                  <CheckGrid columns={1} center items={[ 'Repositórios ativos', 'CI/CD ou abertura para ajustes', 'Sponsor executivo para remoção de bloqueios' ]} />
                </div>
                <div>
                  <h4 style={{ color:'var(--text-white)', fontWeight:900, marginBottom:'1rem', textAlign:'center' }}>Formato e carga horária</h4>
                  <CheckGrid columns={1} center items={[ '100% remoto, gravado e documentado', 'Mês 1: 2–3 sessões/semana (2h–3h)', 'Meses 2–3: 1 sessão/semana + mentoria', 'Canal dedicado para suporte' ]} />
                </div>
              </div>
            </PageSection>

            <DividerGlow />

            {/* DIFERENCIAIS / GARANTIA / FAQ (sem cards) */}
            <PageSection paddingY="0 0 2rem" center>
              <h3 style={{ fontSize:'1.6rem', fontWeight:900, marginBottom:'1rem', color:'var(--text-white)', textAlign:'center' }}>Diferenciais</h3>
              <CheckGrid columns={2} center items={[ 'Programa orientado a métricas, não a slides', 'Materiais e playbooks proprietários', 'Mentores que implementam junto', 'Foco em casos reais da sua empresa' ]} />
              <div style={{ height: '2rem' }} />
              <h3 style={{ fontSize:'1.6rem', fontWeight:900, marginBottom:'1rem', color:'var(--text-white)', textAlign:'center' }}>Garantia de valor</h3>
              <p style={{ color:'var(--text-gray)', textAlign:'center', maxWidth: 700, margin: '0 auto', lineHeight: 1.7 }}>Se após 30 dias não houver evidências de ganho de velocidade/qualidade, realinhamos o escopo sem custo adicional até materializar valor.</p>
              <div style={{ height: '2rem' }} />
              <h3 style={{ fontSize:'1.6rem', fontWeight:900, marginBottom:'1rem', color:'var(--text-white)', textAlign:'center' }}>FAQ</h3>
              <FAQAccordion
                items={[
                  { q: 'Quantas pessoas podem participar?', a: <>Até 20 devs no plano base.</> },
                  { q: 'É possível personalizar o escopo?', a: <>Sim, adaptamos a casos reais.</> },
                  { q: 'Temos restrições de compliance?', a: <>Trabalhamos com guardrails e políticas.</> },
                  { q: 'Como mensuram ROI?', a: <>Definimos baseline e acompanhamos DORA/Lead Time.</> },
                ]}
              />
            </PageSection>

            {/* PREÇO E CTA (ocultado temporariamente) */}
            {/**
             * <div style={{ margin: '5rem 0 4rem' }}>
             *   <PricingBanner
             *     price="R$ 89.000"
             *     compareAt="R$ 129.000"
             *     bullets={['Valor único para até 20 desenvolvedores', '3 meses de acompanhamento inclusos']}
             *   />
             * </div>
             */}
            {/**
             * <div style={{ margin: '5rem 0 4rem', textAlign: 'center' }}>
             *   <a href="#contato" className="cta-primary-modern" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
             *     Falar com especialista
             *   </a>
             * </div>
             */}
          </div>
        </div>
      </div>

      {/* FALE CONOSCO */}
      <div id="contato" className="section-modern section-dark">
        <div className="container-modern">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, textAlign: 'center', marginBottom: '2rem', color: 'var(--text-white)' }}>
              Fale conosco
            </h2>
            
            {submitStatus === 'success' && (
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '8px', padding: '1rem', marginBottom: '2rem', textAlign: 'center' }}>
                <p style={{ color: '#22c55e', margin: 0 }}>✅ Solicitação enviada! Entraremos em contato em até 24h.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '1rem', marginBottom: '2rem', textAlign: 'center' }}>
                <p style={{ color: '#ef4444', margin: 0 }}>❌ Erro ao enviar. Tente novamente.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome completo *"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  style={{ padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-white)', fontSize: '1rem' }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail corporativo *"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{ padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-white)', fontSize: '1rem' }}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input
                  type="text"
                  name="empresa"
                  placeholder="Empresa *"
                  value={formData.empresa}
                  onChange={handleInputChange}
                  required
                  style={{ padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-white)', fontSize: '1rem' }}
                />
                <input
                  type="text"
                  name="cargo"
                  placeholder="Cargo *"
                  value={formData.cargo}
                  onChange={handleInputChange}
                  required
                  style={{ padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-white)', fontSize: '1rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input
                  type="tel"
                  name="telefone"
                  placeholder="Telefone *"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  required
                  style={{ padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-white)', fontSize: '1rem' }}
                />
                <select
                  name="tamanhoTime"
                  value={formData.tamanhoTime}
                  onChange={handleInputChange}
                  required
                  className="input-modern"
                >
                  <option value="">Tamanho do time *</option>
                  <option value="1-5 desenvolvedores">1-5 desenvolvedores</option>
                  <option value="6-10 desenvolvedores">6-10 desenvolvedores</option>
                  <option value="11-20 desenvolvedores">11-20 desenvolvedores</option>
                  <option value="20+ desenvolvedores">20+ desenvolvedores</option>
                </select>
              </div>

              <textarea
                name="observacoes"
                placeholder="Observações ou necessidades específicas"
                value={formData.observacoes}
                onChange={handleInputChange}
                rows={4}
                style={{ padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-white)', fontSize: '1rem', resize: 'vertical' }}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="cta-primary-modern"
                style={{ fontSize: '1.1rem', padding: '1rem 2rem', width: '100%' }}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: '4rem 0', background: '#000000', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container-modern">
          <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', textAlign:'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-white)', marginBottom: '0.5rem', textTransform:'none' }}>
              Parceiro oficial windsurf
            </div>
            <div style={{ color: 'var(--text-gray)', fontSize: '0.8rem' }}>
              © 2024 Snowman Labs. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TreinamentoPage
