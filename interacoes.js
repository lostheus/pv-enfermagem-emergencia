/* Recursos adicionados à estrutura original, sem alterar sua composição. */
(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  const oferta = window.OFERTA || {};
  if (Number.isFinite(oferta.preco) && oferta.preco > 0) {
    const [reais, centavos] = oferta.preco.toFixed(2).split('.');
    $('.plan-price').innerHTML = 'R$ ' + reais + '<span>,' + centavos + '</span>';
  }
  let checkout;
  try { const u = new URL(oferta.checkoutUrl); if (u.protocol === 'https:') checkout = u; } catch {}
  if (checkout) {
    $('.plan-note').textContent = 'Arquivos digitais para baixar · Garantia de 7 dias após a compra';
    $('.faq-answer p').textContent = 'Após a confirmação do pagamento, siga as instruções de acesso enviadas pela plataforma ao e-mail informado na compra. Baixe os arquivos para guardar nos seus dispositivos.';
  }
  $$('[data-checkout]').forEach(b => b.addEventListener('click', e => {
    e.preventDefault();
    if (!checkout) { $('#checkout-dialog').showModal(); return; }
    const dest = new URL(checkout);
    new URLSearchParams(location.search).forEach((v,k) => {
      if ((/^utm_/i.test(k) || ['src','sck'].includes(k)) && !dest.searchParams.has(k)) dest.searchParams.set(k,v);
    });
    location.assign(dest.href);
  }));
  $$('[data-ampliar]').forEach(img => {
    img.tabIndex = img.closest('[data-carousel-clone]') ? -1 : 0;
    img.setAttribute('role','button');
    img.setAttribute('aria-label','Ampliar '+img.alt);
    const open = () => { $('#expanded-image').src=img.src; $('#expanded-image').alt=img.alt; $('#image-dialog').showModal(); };
    img.addEventListener('click',open);
    img.addEventListener('keydown',e => { if (e.key==='Enter'||e.key===' ') {e.preventDefault();open();} });
  });
  $$('dialog').forEach(d => {
    d.querySelectorAll('.close,.close-action').forEach(b => b.addEventListener('click',()=>d.close()));
    d.addEventListener('click',e => { if (e.target===d) { const r=d.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close(); } });
  });
  const legal = {
    terms: '<h2>Termos de Uso</h2><p>A coleção é um material digital educacional para uso pessoal. A compra não inclui impressão, envio físico, licença de revenda ou redistribuição.</p><p>O conteúdo trata de emergência adulta e tem revisão técnica especializada pendente nesta edição. Não substitui formação, avaliação clínica, prescrição, protocolos locais ou supervisão.</p><p>O pagamento é único de R$ 37,90. Os meios de pagamento, dados do vendedor e canal de atendimento estarão disponíveis no checkout antes da compra.</p><p>A garantia prevista é de sete dias após a compra, com solicitação de reembolso integral pelo canal informado na plataforma.</p>',
    privacy: '<h2>Política de Privacidade</h2><p>Esta página não possui cadastro, cookies de publicidade ou ferramentas de análise. Dados de pagamento não são coletados aqui.</p><p>As fontes são carregadas do Google Fonts, que recebe dados técnicos de conexão. A hospedagem também pode registrar acessos técnicos para operação e segurança.</p><p>Quando o checkout estiver disponível, os dados necessários à compra serão tratados pela plataforma indicada, conforme a política exibida nela. Parâmetros de origem de campanha podem ser encaminhados ao checkout.</p><p>Para atendimento e solicitações sobre dados de compra, consulte o contato do vendedor na plataforma utilizada.</p>'
  };
  $$('[data-legal]').forEach(a => a.addEventListener('click',e => {e.preventDefault();$('#legal-content').innerHTML=legal[a.dataset.legal];$('#legal-dialog').showModal();}));
  const slider=$('#comparisonSlider'),handle=$('.comparison-handle');
  if(slider&&handle){
    handle.tabIndex=0;handle.setAttribute('role','slider');handle.setAttribute('aria-label','Divisor entre texto corrido e mapa visual');handle.setAttribute('aria-valuemin','3');handle.setAttribute('aria-valuemax','97');handle.setAttribute('aria-valuenow','50');
    slider.addEventListener('pointermove',()=>handle.setAttribute('aria-valuenow',parseFloat(slider.style.getPropertyValue('--slider-pos'))||50));
    handle.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();let v=parseFloat(slider.style.getPropertyValue('--slider-pos'))||50;v=e.key==='Home'?3:e.key==='End'?97:Math.max(3,Math.min(97,v+(e.key==='ArrowRight'?5:-5)));slider.style.setProperty('--slider-pos',v+'%');handle.setAttribute('aria-valuenow',v);}});
  }
})();
