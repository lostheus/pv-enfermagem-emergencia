/* Recursos adicionados à estrutura original, sem alterar sua composição. */
(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  const offerDate = $('#offer-date');
  if (offerDate) {
    const updateOfferDate = () => {
      const parts = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Rio_Branco', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
      const date = Object.fromEntries(parts.map(part => [part.type, part.value]));
      offerDate.textContent = `${date.day}/${date.month}/${date.year}`;
      offerDate.dateTime = `${date.year}-${date.month}-${date.day}`;
    };
    updateOfferDate();
    setInterval(updateOfferDate, 60000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) updateOfferDate(); });
  }
  const oferta = window.OFERTA || {};
  $$('[data-checkout]').forEach(button => {
    const plan = oferta.planos?.[button.dataset.checkout];
    let checkout;
    try { const url = new URL(plan?.checkoutUrl); if (url.protocol === 'https:') checkout = url; } catch {}
    if (checkout) button.href = checkout.href;
    button.addEventListener('click', event => {
      event.preventDefault();
      if (!checkout) { $('#checkout-dialog').showModal(); return; }
      const dest = new URL(checkout);
      new URLSearchParams(location.search).forEach((value, key) => {
        if ((/^utm_/i.test(key) || ['src', 'sck'].includes(key)) && !dest.searchParams.has(key)) dest.searchParams.set(key, value);
      });
      location.assign(dest.href);
    });
  });
  let imageScale = 1;
  const zoomButton = $('#image-zoom');
  function resetImageZoom() {
    imageScale = 1;
    $('#expanded-image').style.width = '100%';
    if (zoomButton) zoomButton.textContent = 'Ampliar 2×';
    const scroll = $('.image-scroll');
    if (scroll) { scroll.scrollTop = 0; scroll.scrollLeft = 0; }
  }
  function openImage(src, alt) {
    $('#expanded-image').src = src;
    $('#expanded-image').alt = alt;
    resetImageZoom();
    $('#image-dialog').showModal();
  }
  if (zoomButton) zoomButton.addEventListener('click', () => {
    imageScale = imageScale === 3 ? 1 : imageScale + 1;
    $('#expanded-image').style.width = imageScale * 100 + '%';
    zoomButton.textContent = imageScale === 3 ? 'Voltar ao tamanho inicial' : 'Ampliar ' + (imageScale + 1) + '×';
  });
  $$('[data-open-map]').forEach(button => button.addEventListener('click', () => openImage(button.dataset.openMap, 'Mapa 041: hipoglicemia e hiperglicemia')));
  $$('[data-ampliar]').forEach(img => {
    img.tabIndex = img.closest('[data-carousel-clone]') ? -1 : 0;
    img.setAttribute('role','button');
    img.setAttribute('aria-label','Ampliar '+img.alt);
    const open = () => openImage(img.src, img.alt);
    img.addEventListener('click',open);
    img.addEventListener('keydown',e => { if (e.key==='Enter'||e.key===' ') {e.preventDefault();open();} });
  });
  $$('dialog').forEach(d => {
    d.querySelectorAll('.close,.close-action').forEach(b => b.addEventListener('click',()=>d.close()));
    d.addEventListener('click',e => { if (e.target===d) { const r=d.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close(); } });
  });
  const legal = {
    terms: '<h2>Termos de Uso</h2><p>A coleção é um material digital educacional para uso pessoal. A compra não inclui impressão, envio físico, licença de revenda ou redistribuição.</p><p>O conteúdo trata de emergência adulta e tem revisão técnica especializada pendente nesta edição. Não substitui formação, avaliação clínica, prescrição, protocolos locais ou supervisão.</p><p>O pagamento é único: R$ 17,90 no Plano Básico ou R$ 27,90 no Plano Completo. Os meios de pagamento, dados do vendedor e canal de atendimento estarão disponíveis no checkout antes da compra.</p><p>A garantia prevista é de sete dias após a compra, com solicitação de reembolso integral pelo canal informado na plataforma.</p>',
    privacy: '<h2>Política de Privacidade</h2><p>Esta página não possui cadastro, cookies de publicidade ou ferramentas de análise. Dados de pagamento não são coletados aqui.</p><p>As fontes são carregadas do Google Fonts, que recebe dados técnicos de conexão. A hospedagem também pode registrar acessos técnicos para operação e segurança.</p><p>O pagamento e os dados necessários à compra são tratados pela Cakto, conforme a política de privacidade exibida no checkout. Parâmetros de origem de campanha podem ser encaminhados ao checkout.</p><p>Para atendimento e solicitações sobre dados de compra, consulte o contato do vendedor na plataforma utilizada.</p>'
  };
  $$('[data-legal]').forEach(a => a.addEventListener('click',e => {e.preventDefault();$('#legal-content').innerHTML=legal[a.dataset.legal];$('#legal-dialog').showModal();}));
  const slider=$('#comparisonSlider'),handle=$('.comparison-handle');
  if(slider&&handle){
    handle.tabIndex=0;handle.setAttribute('role','slider');handle.setAttribute('aria-label','Divisor entre texto corrido e mapa visual');handle.setAttribute('aria-valuemin','3');handle.setAttribute('aria-valuemax','97');handle.setAttribute('aria-valuenow','50');
    slider.addEventListener('pointermove',()=>handle.setAttribute('aria-valuenow',parseFloat(slider.style.getPropertyValue('--slider-pos'))||50));
    handle.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();let v=parseFloat(slider.style.getPropertyValue('--slider-pos'))||50;v=e.key==='Home'?3:e.key==='End'?97:Math.max(3,Math.min(97,v+(e.key==='ArrowRight'?5:-5)));slider.style.setProperty('--slider-pos',v+'%');handle.setAttribute('aria-valuenow',v);}});
  }
})();
