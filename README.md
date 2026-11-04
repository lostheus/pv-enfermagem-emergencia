# Página de vendas · Enfermagem na Emergência

Página estática e independente, refeita sobre o **HTML e CSS originais da referência**. Preserva suas 12 seções, fontes, cores, botões verdes, marca-texto amarelo, carrosséis, comparador arrastável e card único de oferta. Preço aprovado: **R$ 37,90**, pagamento único. Garantia de sete dias conforme planejamento original. Nenhuma publicação foi realizada.

## Visualizar

Abra `index.html` no navegador ou execute, dentro desta pasta:

```powershell
python -m http.server 4173
```

Acesse `http://localhost:4173`.

## Ativar a compra

Preencha `checkoutUrl` em `config.js` com o endereço HTTPS do checkout correto. Até isso acontecer, o botão abre um aviso e não inicia pagamento. A página troca automaticamente os avisos de preparação pelas instruções de acesso ao configurar um link válido. Parâmetros `utm_*`, `src` e `sck` são encaminhados ao checkout.

O preço aparece no HTML e nos textos da oferta, FAQ e metadados. `preco` em `config.js` controla a exibição numérica do card; se alterar o valor no futuro, atualize também esses textos.

## GitHub e Vercel

1. Envie **esta pasta** para um repositório GitHub, ou mantenha-a como subpasta de um repositório maior.
2. Na Vercel, importe o repositório.
3. Se o repositório contiver o projeto inteiro, selecione `pagina-vendas` em **Root Directory**. Se enviar só o conteúdo desta pasta, use a raiz.
4. Em **Framework Preset**, selecione **Other**. Sem comando de build, sem instalação e com diretório de saída padrão (`.`).
5. Publique. `vercel.json` já está incluído. Não é necessário Node.js para executar o site.

## Conteúdo

- `index.html`: HTML, CSS e interações originais da referência, com copy de enfermagem.
- `config.js`: checkout e valor numérico do card.
- `ajustes.css`: diálogos e acessibilidade adicionados à estrutura original.
- `interacoes.js`: checkout, ampliação das páginas, termos, privacidade e teclado do comparador.
- `assets/`: kit recortado, capas de bônus, cenas de uso e prévias reais dos mapas.
- `docs/`: registro dos visuais e conferência.

Não envie PDFs pagos nem o ZIP de entrega para a pasta pública. Aqui entram apenas as amostras selecionadas.

## Antes da publicação comercial

- Inserir o link do checkout e conferir identificação do vendedor e canal de suporte nele.
- Confirmar os dados legais e as condições do checkout contra os termos da página.
- A edição do produto registra revisão técnica especializada pendente. A página preserva essa informação e não apresenta chancela ou validação clínica.

Os scripts de rastreamento, depoimentos, avaliações e checkout da referência foram excluídos. Os espaços de prova mostram características verificáveis do produto. Nenhuma escassez artificial ou preço anterior foi criado. As imagens usadas na página foram convertidas para WebP em 04/11/2026, com autorização do usuário. Total publicado, incluindo SVG e favicon: **2.396.512 bytes (2,40 MB)**, abaixo do limite de 2,5 MB. Os mapas mantêm 992 × 1403 pixels. Os PNGs antigos foram removidos da versão atual do repositório por solicitação do usuário. A pasta assets contém somente as imagens usadas pela página.

As fontes Google, o Tailwind e o Lucide utilizam os carregamentos externos da própria referência. Não é necessário instalar dependências para publicar a página.

Referência de estrutura e paleta: https://pv-guia-nutri-concursos.vercel.app/


Atualização: os dois carrosséis usam movimento contínuo para a direita, com ciclos sem salto, pausa, setas e arraste. Arquivo: `carrosseis.js`. A faixa do topo usa três fotos ilustrativas de perfil, sem atribuir depoimentos ou avaliação a essas pessoas. Origem: Random User Generator, retratos women/47, women/32 e women/44; cópias locais WebP de 80 × 80 pixels.


Legibilidade revisada em 04/11/2026: descrições em 16px, títulos de cards em 18px, rótulos secundários em 14px e controles com área de toque de ao menos 44px. Hero permite quebra natural no celular. Módulos não comprimem o texto para acomodar selos. As prévias têm ampliação de 2× e 3×, com rolagem interna. O layout continua com a mesma sequência da referência.
