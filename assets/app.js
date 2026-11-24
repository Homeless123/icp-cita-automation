/* LuzLibre - client-side, no backend, privacy-first.
 * Calculator/recommender based on the "LuzLibre — Coding Map" (Nov 2026).
 * Prices are reference data: verify on source before contracting. */
(() => {
  'use strict';

  // ---------- I18N ----------
  const I18N = {
    es: {
      'brand.tag': 'Comparador eléctrico abierto · gratuito · sin teléfonos',
      'nav.email': 'Email', 'nav.github': 'GitHub',
      'hero.eyebrow': 'Herramienta pública para decidir con calma',
      'hero.title': 'Compara tu factura eléctrica.<br><span class="accent">Sin trampas. Sin llamadas.</span>',
      'hero.lead': 'Introduce tu consumo, calcula el coste anual real con impuestos, compara tarifas y genera un informe claro. Diseñado desde un mapa real de investigación en España, extensible a otros países.',
      'hero.cta': 'Empezar comparación', 'hero.cta2': 'Abrir modo creativo',
      'trust.free': 'Gratis y open-source', 'trust.email': 'Solo email, nunca teléfono', 'trust.verify': 'Verifica antes de contratar',
      'panel.kicker': 'Resumen rápido', 'panel.badge': 'Cálculo local',
      'panel.stat1l': 'Tu coste anual', 'panel.stat2l': 'Mejor opción', 'panel.stat3l': 'Ahorro estimado', 'panel.stat4l': 'Tarifas comparadas',
      'panel.foot': 'Rellena tu perfil para ver la recomendación.',
      'profile.eyebrow': 'Paso 1', 'profile.title': 'Tu perfil de consumo',
      'profile.lead': 'Los datos se quedan en tu navegador. No se envían a ningún servidor.',
      'profile.country': 'País / mercado', 'profile.inputs': 'Datos básicos', 'profile.consumption': 'Consumo',
      'profile.tariffs': 'Tarifas del mercado',
      'profile.tariffsLead': 'Dataset de referencia comunitario. Puedes editar, añadir o importar tarifas. Cada tarifa debe tener fuente y fecha.',
      'f.cups': 'CUPS (opcional)', 'f.cupsHint': 'Se usa solo para tus borradores de email. No se guarda fuera del navegador.',
      'f.currentCost': 'Coste actual anual € (opcional)', 'f.p1kw': 'Potencia P1 (kW)', 'f.p2kw': 'Potencia P2 (kW)',
      'f.modeAnnual': 'Anual (kWh)', 'f.modeBill': 'Factura 3 meses',
      'f.annualKwh': 'Consumo anual total (kWh)', 'f.p1kwh': 'P1 punta (kWh/año)', 'f.p2kwh': 'P2 llano (kWh/año)', 'f.p3kwh': 'P3 valle (kWh/año)',
      'f.splitHint': 'Si dejas P1/P2/P3 vacío, se usa el reparto por defecto del país (España 2.0TD: 24/24/52).',
      'f.billAmount': 'Importe factura 3 meses (€)', 'f.billKwh': 'kWh factura 3 meses',
      'f.billWarn': 'La anualización ×4 es aproximada. Si tienes consumo anual real o reparto P1/P2/P3, úsalo para mayor precisión.',
      'f.vat': 'IVA (%)', 'f.iee': 'Impuesto eléctrico (%)', 'f.meter': 'Alquiler contador (€/día)',
      'f.bono': 'Tengo bono social (filtra ofertas incompatibles)',
      'f.calc': 'Calcular y comparar', 'f.reset': 'Restablecer',
      'f.privacy': 'Privacidad: cálculo 100% local en tu navegador. CUPS y datos no salen de tu dispositivo.',
      'f.import': 'Importar JSON', 'f.exportData': 'Exportar dataset',
      't.company': 'Compañía', 't.tariff': 'Tarifa', 't.type': 'Tipo', 't.source': 'Fuente',
      't.add': '+ Añadir tarifa manualmente', 't.addBtn': 'Añadir',
      'r.eyebrow': 'Paso 2', 'r.title': 'Resultados y recomendación',
      'r.lead': 'Coste anual estimado con impuestos. Cada fila muestra la matemática y la fuente. No es asesoramiento financiero ni una oferta vinculante.',
      'r.print': 'Imprimir / Guardar PDF', 'r.ranking': 'Ranking anual (con impuestos)', 'r.split': 'Reparto de consumo',
      'r.verdictPending': 'Pendiente de cálculo', 'r.verdictPendingBody': 'Introduce tu perfil y pulsa "Calcular y comparar".',
      'r.c1': 'Pide la oferta por escrito (email) antes de cambiar.',
      'r.c2': 'Pregunta a tu comercializadora actual si iguala la oferta (retención / baja y volver).',
      'r.c3': 'No canceles antes de confirmar el nuevo contrato. El cambio en España es seamless.',
      'r.c4': 'Tienes 14 días de desistimiento en contratos a distancia.',
      'r.detail': 'Detalle por tarifa', 'r.colRank': '#', 'r.colTariff': 'Tarifa', 'r.colAnnual': '€/año', 'r.colMonth': '€/mes',
      'r.colDiff': 'vs actual', 'r.colFlags': 'Señales', 'r.colSource': 'Fuente', 'r.empty': 'Sin resultados todavía.',
      'c.eyebrow': 'Modo creativo', 'c.title': 'Laboratorio de escenarios',
      'c.lead': 'Juega con variables reales: cambia el consumo, simula autoconsumo solar, ajusta impuestos o crea tu propio país/mercado. Todo recalcula al instante.',
      'c.badge': 'What-if en vivo', 'c.scenario': 'Escenario rápido',
      'c.consumptionDelta': 'Cambio de consumo', 'c.solar': 'Autoconsumo solar (offset)', 'c.pool': 'Escenario pool indexada',
      'c.poolHint': 'Afecta a tarifas indexadas/trimestrales: muestra rango bajo/medio/estrés.',
      'c.powerOpt': 'Optimización potencia', 'c.powerHint': 'Simula bajar/subir P1 y P2 para ver impacto en término fijo.',
      'c.apply': 'Aplicar escenario', 'c.customCountry': 'País / mercado personalizado',
      'c.customLead': 'Extiende el comparador a cualquier país. Define impuestos, moneda y periodos. Guarda el JSON y compártelo en el repo.',
      'c.ccode': 'Código', 'c.ccur': 'Moneda', 'c.ctax': 'Imp. eléctrico %', 'c.cperiods': 'Periodos energía (coma)',
      'c.capply': 'Usar mercado personalizado',
      'c.cnote': 'Consejo: para publicar un país nuevo, añade <code>data/tariffs.xx.json</code> y un objeto en <code>data/countries.json</code>.',
      'c.insights': 'Insights creativos',
      'c.i1': 'Simula bajar 0,5 kW de potencia: a veces ahorras más que cambiando de tarifa.',
      'c.i2': 'Las indexadas pueden salir bien con pool bajo, pero nunca las compares con un solo número.',
      'c.i3': 'Si el ahorro es menor de 100 €/año, prueba "baja y volver" con tu compañía actual.',
      'c.exportTitle': 'Compartir resultado', 'c.exportLead': 'Genera un resumen limpio para enviártelo por email o guardarlo.',
      'c.copy': 'Copiar resumen',
      'e.eyebrow': 'Paso 3', 'e.title': 'Mesa de email (solo email)',
      'e.lead': 'Sin teléfonos. Sin contratos automáticos. Genera un borrador claro para pedir oferta por escrito. Tú revisas y envías.',
      'e.compose': 'Borrador', 'e.to': 'Destinatario (email)', 'e.subject': 'Asunto', 'e.body': 'Mensaje',
      'e.open': 'Abrir en tu cliente de correo', 'e.copy': 'Copiar borrador',
      'e.warn': 'Regla de oro: no se envía nada automáticamente. El borrador incluye tu perfil solo si tú lo has rellenado.',
      'e.principles': 'Principios del proyecto',
      'e.p1t': 'Email only', 'e.p1': 'El modelo no tiene campo de teléfono. Las plantillas piden respuesta por escrito.',
      'e.p2t': 'Matemática visible', 'e.p2': 'Cada recomendación muestra coste anual, impuestos y diferencia. Sin cajas negras.',
      'e.p3t': 'Sin contratos automáticos', 'e.p3': 'La herramienta informa; la decisión final y el envío del email los haces tú.',
      'e.p4t': 'Extensible por países', 'e.p4': 'España viene precargada. Puedes añadir mercados con JSON y reglas de impuestos.',
      'e.gdpr': 'Privacidad/GDPR: por defecto todo se calcula en local. Si publicas un fork, no recojas datos personales sin base legal clara.',
      'j.eyebrow': 'El mapa detrás de la herramienta', 'j.title': 'De investigación real a herramienta pública',
      'j.lead': 'Este comparador nace de un mapa de código/investigación: facturas reales, reglas validadas y trampas detectadas. Aquí está la ruta para que cualquiera pueda auditarla y mejorarla.',
      'j.s1t': 'Recoger precios', 'j.s1': 'Scrapers por compañía, fuente + fecha + evidencia. Nada de precios "mágicos".',
      'j.s2t': 'Normalizar datos', 'j.s2': 'Mismo esquema: energía P1/P2/P3, potencia, permanencia, SVA, reglas por consumo.',
      'j.s3t': 'Calcular coste real', 'j.s3': 'Fórmula con impuestos, alquiler contador y anualización. Resultado en €/año con IVA.',
      'j.s4t': 'Recomendar con reglas', 'j.s4': 'Ahorro mínimo, alertas indexadas, exclusión SVA, checklist de "baja y volver".',
      'j.s5t': 'Comunicar por email', 'j.s5': 'Borradores claros ES/EN. El humano revisa y envía. Sin teléfono, sin presión.',
      'j.lessons': 'Lecciones incorporadas al código',
      'j.l1t': 'Dos precios en una misma web', 'j.l1': 'Ej.: Naturgy puede mostrar conjuntos distintos. El modelo exige nombre de producto + fuente + fecha.',
      'j.l2t': 'Trampa por tramo de consumo', 'j.l2': 'Ej.: TotalEnergies &lt;/&gt; 4000 kWh. Se modela con <code>tier_rule</code>, no con un precio plano.',
      'j.l3t': 'Indexada ≠ número único', 'j.l3': 'El pool cambia. Se muestran escenarios bajo/medio/estrés en modo creativo.',
      'j.l4t': 'Bundles con servicios', 'j.l4': 'SVA/seguros se marcan y se excluyen por defecto de la recomendación.',
      'foot.desc': 'Proyecto open-source. Gratis, público y auditable. Hecho para ayudar a tomar decisiones informadas, no para presionar ventas.',
      'foot.readme': 'README', 'foot.data': 'Dataset ES', 'foot.license': 'Licencia MIT'
    },
    en: {
      'brand.tag': 'Open electricity comparator · free · no phone calls',
      'nav.email': 'Email', 'nav.github': 'GitHub',
      'hero.eyebrow': 'A public tool for calm decisions',
      'hero.title': 'Compare your electricity bill.<br><span class="accent">No traps. No calls.</span>',
      'hero.lead': 'Enter your consumption, calculate the real annual cost with taxes, compare tariffs and generate a clear report. Built from a real research coding map in Spain, extensible to other countries.',
      'hero.cta': 'Start comparison', 'hero.cta2': 'Open creative mode',
      'trust.free': 'Free and open-source', 'trust.email': 'Email only, never phone', 'trust.verify': 'Verify before contracting',
      'panel.kicker': 'Quick summary', 'panel.badge': 'Local calculation',
      'panel.stat1l': 'Your annual cost', 'panel.stat2l': 'Best option', 'panel.stat3l': 'Estimated saving', 'panel.stat4l': 'Tariffs compared',
      'panel.foot': 'Fill in your profile to see the recommendation.',
      'profile.eyebrow': 'Step 1', 'profile.title': 'Your consumption profile',
      'profile.lead': 'Your data stays in your browser. Nothing is sent to any server.',
      'profile.country': 'Country / market', 'profile.inputs': 'Basic data', 'profile.consumption': 'Consumption',
      'profile.tariffs': 'Market tariffs',
      'profile.tariffsLead': 'Community reference dataset. You can edit, add or import tariffs. Every tariff should have a source and date.',
      'f.cups': 'CUPS (optional)', 'f.cupsHint': 'Used only for your email drafts. Not stored outside the browser.',
      'f.currentCost': 'Current annual cost € (optional)', 'f.p1kw': 'Power P1 (kW)', 'f.p2kw': 'Power P2 (kW)',
      'f.modeAnnual': 'Annual (kWh)', 'f.modeBill': '3-month bill',
      'f.annualKwh': 'Total annual consumption (kWh)', 'f.p1kwh': 'P1 peak (kWh/year)', 'f.p2kwh': 'P2 flat (kWh/year)', 'f.p3kwh': 'P3 valley (kWh/year)',
      'f.splitHint': 'If you leave P1/P2/P3 empty, the country default split is used (Spain 2.0TD: 24/24/52).',
      'f.billAmount': '3-month bill amount (€)', 'f.billKwh': '3-month bill kWh',
      'f.billWarn': 'Annualizing ×4 is approximate. If you have real annual consumption or P1/P2/P3 split, use it for better accuracy.',
      'f.vat': 'VAT (%)', 'f.iee': 'Electricity tax (%)', 'f.meter': 'Meter rental (€/day)',
      'f.bono': 'I have social bonus (filter incompatible offers)',
      'f.calc': 'Calculate and compare', 'f.reset': 'Reset',
      'f.privacy': 'Privacy: 100% local calculation in your browser. CUPS and data never leave your device.',
      'f.import': 'Import JSON', 'f.exportData': 'Export dataset',
      't.company': 'Company', 't.tariff': 'Tariff', 't.type': 'Type', 't.source': 'Source',
      't.add': '+ Add tariff manually', 't.addBtn': 'Add',
      'r.eyebrow': 'Step 2', 'r.title': 'Results and recommendation',
      'r.lead': 'Estimated annual cost with taxes. Each row shows the math and source. Not financial advice or a binding offer.',
      'r.print': 'Print / Save PDF', 'r.ranking': 'Annual ranking (tax included)', 'r.split': 'Consumption split',
      'r.verdictPending': 'Pending calculation', 'r.verdictPendingBody': 'Enter your profile and click "Calculate and compare".',
      'r.c1': 'Ask for the offer in writing (email) before switching.',
      'r.c2': 'Ask your current retailer to match the offer (retention / cancel-and-rejoin).',
      'r.c3': 'Do not cancel before confirming the new contract. In Spain the switch is seamless.',
      'r.c4': 'You have a 14-day cooling-off right for distance contracts.',
      'r.detail': 'Tariff detail', 'r.colRank': '#', 'r.colTariff': 'Tariff', 'r.colAnnual': '€/year', 'r.colMonth': '€/month',
      'r.colDiff': 'vs current', 'r.colFlags': 'Signals', 'r.colSource': 'Source', 'r.empty': 'No results yet.',
      'c.eyebrow': 'Creative mode', 'c.title': 'Scenario Lab',
      'c.lead': 'Play with real variables: change consumption, simulate solar self-consumption, adjust taxes or create your own country/market. Everything recalculates instantly.',
      'c.badge': 'Live what-if', 'c.scenario': 'Quick scenario',
      'c.consumptionDelta': 'Consumption change', 'c.solar': 'Solar self-consumption (offset)', 'c.pool': 'Indexed pool scenario',
      'c.poolHint': 'Affects indexed/quarterly tariffs: shows low/avg/stress range.',
      'c.powerOpt': 'Power optimization', 'c.powerHint': 'Simulate lowering/raising P1 and P2 to see fixed-term impact.',
      'c.apply': 'Apply scenario', 'c.customCountry': 'Custom country / market',
      'c.customLead': 'Extend the comparator to any country. Define taxes, currency and periods. Save the JSON and share it in the repo.',
      'c.ccode': 'Code', 'c.ccur': 'Currency', 'c.ctax': 'Elec. tax %', 'c.cperiods': 'Energy periods (comma)',
      'c.capply': 'Use custom market',
      'c.cnote': 'Tip: to publish a new country, add <code>data/tariffs.xx.json</code> and an object in <code>data/countries.json</code>.',
      'c.insights': 'Creative insights',
      'c.i1': 'Try lowering contracted power by 0.5 kW: sometimes it saves more than switching tariff.',
      'c.i2': 'Indexed tariffs can be good with low pool prices, but never compare them as a single number.',
      'c.i3': 'If savings are under €100/year, try "cancel-and-rejoin" with your current retailer first.',
      'c.exportTitle': 'Share result', 'c.exportLead': 'Generate a clean summary to email yourself or save.',
      'c.copy': 'Copy summary',
      'e.eyebrow': 'Step 3', 'e.title': 'Email desk (email only)',
      'e.lead': 'No phones. No automatic contracts. Generate a clear draft to request a written offer. You review and send.',
      'e.compose': 'Draft', 'e.to': 'Recipient (email)', 'e.subject': 'Subject', 'e.body': 'Message',
      'e.open': 'Open in your mail client', 'e.copy': 'Copy draft',
      'e.warn': 'Golden rule: nothing is sent automatically. The draft includes your profile only if you filled it in.',
      'e.principles': 'Project principles',
      'e.p1t': 'Email only', 'e.p1': 'The model has no phone field. Templates ask for a written response.',
      'e.p2t': 'Visible math', 'e.p2': 'Every recommendation shows annual cost, taxes and difference. No black boxes.',
      'e.p3t': 'No automatic contracts', 'e.p3': 'The tool informs; the final decision and sending the email are yours.',
      'e.p4t': 'Country-extensible', 'e.p4': 'Spain comes preloaded. You can add markets with JSON and tax rules.',
      'e.gdpr': 'Privacy/GDPR: by default everything is calculated locally. If you publish a fork, do not collect personal data without a clear legal basis.',
      'j.eyebrow': 'The map behind the tool', 'j.title': 'From real research to a public tool',
      'j.lead': 'This comparator comes from a real coding/research map: real bills, validated rules and detected traps. Here is the path so anyone can audit and improve it.',
      'j.s1t': 'Collect prices', 'j.s1': 'Per-company scrapers, source + date + evidence. No "magic" prices.',
      'j.s2t': 'Normalize data', 'j.s2': 'Same schema: P1/P2/P3 energy, power, lock-in, SVA, consumption rules.',
      'j.s3t': 'Calculate real cost', 'j.s3': 'Formula with taxes, meter rental and annualization. Result in €/year with VAT.',
      'j.s4t': 'Recommend with rules', 'j.s4': 'Minimum savings, indexed alerts, SVA exclusion, "cancel-and-rejoin" checklist.',
      'j.s5t': 'Communicate by email', 'j.s5': 'Clear ES/EN drafts. The human reviews and sends. No phone, no pressure.',
      'j.lessons': 'Lessons encoded in the code',
      'j.l1t': 'Two prices on the same page', 'j.l1': 'E.g. Naturgy may show different sets. The model requires product name + source + date.',
      'j.l2t': 'Consumption-tier trap', 'j.l2': 'E.g. TotalEnergies &lt;/&gt; 4000 kWh. Modeled with <code>tier_rule</code>, not a flat price.',
      'j.l3t': 'Indexed ≠ single number', 'j.l3': 'Pool changes. Low/avg/stress scenarios are shown in creative mode.',
      'j.l4t': 'Service bundles', 'j.l4': 'SVA/insurance are flagged and excluded from recommendation by default.',
      'foot.desc': 'Open-source project. Free, public and auditable. Made to help informed decisions, not to pressure sales.',
      'foot.readme': 'README', 'foot.data': 'ES dataset', 'foot.license': 'MIT License'
    }
  };

  // ---------- DEFAULT DATA (fallback when fetch fails, e.g. file://) ----------
  const DEFAULT_COUNTRIES = [
    { code:'ES', name:{es:'España',en:'Spain'}, currency:'EUR', locale:'es-ES', vat:0.21, electricity_tax:0.0511269632, meter_daily_eur:0.02663, periods:['P1','P2','P3'], power_periods:['P1','P2'], default_power_kw:{P1:3.45,P2:3.45}, default_split:{P1:0.24,P2:0.24,P3:0.52}, notes:{es:'Modelo 2.0TD (península). Verifica siempre en tu factura.', en:'2.0TD model (mainland). Always verify on your bill.'}, regulator:{name:'CNMC',url:'https://comparador.cnmc.gob.es/'} },
    { code:'PT', name:{es:'Portugal',en:'Portugal'}, currency:'EUR', locale:'pt-PT', vat:0.23, electricity_tax:0.001, meter_daily_eur:0, periods:['P1','P2','P3'], power_periods:['P1'], default_power_kw:{P1:3.45}, default_split:{P1:0.33,P2:0.33,P3:0.34}, notes:{es:'Plantilla extensible. Añade data/tariffs.pt.json.', en:'Extensible template. Add data/tariffs.pt.json.'}, regulator:{name:'ERSE',url:'https://simulador.precos.erse.pt/'} },
    { code:'DE', name:{es:'Alemania',en:'Germany'}, currency:'EUR', locale:'de-DE', vat:0.19, electricity_tax:0, meter_daily_eur:0, periods:['P1'], power_periods:[], default_power_kw:{}, default_split:{P1:1}, notes:{es:'Plantilla simplificada (precio único).', en:'Simplified template (single price).'}, regulator:{name:'Bundesnetzagentur',url:'https://www.bundesnetzagentur.de/'} },
    { code:'OTHER', name:{es:'Otro país (personalizado)',en:'Other country (custom)'}, currency:'EUR', locale:'en-GB', vat:0, electricity_tax:0, meter_daily_eur:0, periods:['P1'], power_periods:[], default_power_kw:{}, default_split:{P1:1}, notes:{es:'Modo creativo: define tus propios impuestos y tarifas.', en:'Creative mode: define your own taxes and tariffs.'}, regulator:{name:'',url:''} }
  ];
  const DEFAULT_TARIFFS_ES = [
    { id:'visalia-fijo', company:'Visalia', name:'Tarifa Plana / Fijo', type:'fijo', energy:{P1:0.119,P2:0.119,P3:0.119}, power:{P1:0.076,P2:0.076}, permanencia_meses:0, sva_bundle:false, promo_until:null, tier_rule:null, source_url:'https://grupovisalia.com/', extracted_at:'2026-11-24', notes:'Precio de referencia. Verificar.', email_contact:'atencioncliente@grupovisalia.com' },
    { id:'lucera-fijo', company:'Lucera', name:'Fijo', type:'fijo', energy:{P1:0.129,P2:0.129,P3:0.129}, power:{P1:0.082,P2:0.012}, permanencia_meses:0, sva_bundle:false, promo_until:null, tier_rule:null, source_url:'https://lucera.es/', extracted_at:'2026-11-24', notes:'Referencia.', email_contact:'hola@lucera.es' },
    { id:'podo-flexi', company:'Podo', name:'Flexi Tres', type:'trimestral', energy:{P1:0.139,P2:0.139,P3:0.139}, power:{P1:0.089,P2:0.019}, permanencia_meses:0, sva_bundle:false, promo_until:null, tier_rule:null, source_url:'https://mipodo.com/tarifas-luz', extracted_at:'2026-11-24', notes:'Revisión trimestral: tratar como escenario.', email_contact:'hola@mipodo.com' },
    { id:'naturgy-noche', company:'Naturgy', name:'Tarifa Noche (ref.)', type:'dh3', energy:{P1:0.190,P2:0.117,P3:0.082}, power:{P1:0.105,P2:0.033}, permanencia_meses:12, sva_bundle:false, promo_until:null, tier_rule:null, source_url:'https://www.naturgy.es/hogar/luz/', extracted_at:'2026-11-24', notes:'Confirmar producto exacto por escrito.', email_contact:'atencioncliente@naturgy.es' },
    { id:'total-a-tu-aire', company:'TotalEnergies', name:'A tu Aire Siempre (ref.)', type:'fijo', energy:{P1:0.189,P2:0.189,P3:0.189}, power:{P1:0.076,P2:0.076}, permanencia_meses:0, sva_bundle:false, promo_until:null, tier_rule:{type:'annual_kwh', lte:4000, price_lte:0.119, price_gt:0.189}, source_url:'https://www.totalenergies.es/', extracted_at:'2026-11-24', notes:'Precio condicionado por consumo <4000 / >=4000 kWh.', email_contact:'atencioncliente@totalenergies.es' },
    { id:'octopus-3', company:'Octopus Energy', name:'Octopus 3', type:'dh3', energy:{P1:0.169,P2:0.115,P3:0.079}, power:{P1:0.089,P2:0.019}, permanencia_meses:12, sva_bundle:false, promo_until:null, tier_rule:null, source_url:'https://octopusenergy.es/', extracted_at:'2026-11-24', notes:'Referencia 3 periodos.', email_contact:'hola@octopusenergy.es' },
    { id:'holaluz-clasica', company:'Holaluz', name:'Tarifa Clásica (ref.)', type:'fijo', energy:{P1:0.139,P2:0.139,P3:0.139}, power:{P1:0.085,P2:0.015}, permanencia_meses:0, sva_bundle:false, promo_until:null, tier_rule:null, source_url:'https://www.holaluz.com/', extracted_at:'2026-11-24', notes:'Referencia.', email_contact:'hola@holaluz.com' },
    { id:'repsol-facilita', company:'Repsol', name:'FACILITA (bundle ejemplo)', type:'fijo', energy:{P1:0.155,P2:0.155,P3:0.155}, power:{P1:0.089,P2:0.019}, permanencia_meses:12, sva_bundle:true, promo_until:null, tier_rule:null, source_url:'https://www.repsol.es/', extracted_at:'2026-11-24', notes:'Bundle SVA: excluido por defecto.', email_contact:'atencioncliente@repsol.com' },
    { id:'som-energia', company:'Som Energia', name:'Periodos (cooperativa)', type:'dh3', energy:{P1:0.165,P2:0.118,P3:0.085}, power:{P1:0.095,P2:0.020}, permanencia_meses:0, sva_bundle:false, promo_until:null, tier_rule:null, source_url:'https://www.somenergia.coop/', extracted_at:'2026-11-24', notes:'Cooperativa: verificar condición de socio.', email_contact:'info@somenergia.coop' }
  ];

  // ---------- STATE ----------
  const state = {
    lang: 'es',
    countries: [...DEFAULT_COUNTRIES],
    countryCode: 'ES',
    tariffsByCountry: { ES: [...DEFAULT_TARIFFS_ES] },
    results: [],
    profile: null,
    charts: { ranking: null, split: null },
  };

  const $ = (id) => document.getElementById(id);
  const fmtEur = (n, cur='EUR', locale='es-ES') => {
    if (n == null || !isFinite(n)) return '—';
    return new Intl.NumberFormat(locale, { style:'currency', currency:cur, maximumFractionDigits:0 }).format(n);
  };
  const fmtNum = (n, d=2) => (n == null || !isFinite(n)) ? '—' : Number(n).toFixed(d);
  const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function t(key) { return (I18N[state.lang] && I18N[state.lang][key]) || I18N.es[key] || key; }
  function applyI18n() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = t(key);
      if (val.includes('<')) el.innerHTML = val; else el.textContent = val;
    });
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === state.lang));
  }

  // ---------- DATA LOADING ----------
  async function loadData() {
    try {
      const [cRes, tRes] = await Promise.all([
        fetch('data/countries.json', { cache: 'no-store' }),
        fetch('data/tariffs.es.json', { cache: 'no-store' })
      ]);
      if (cRes.ok) {
        const cData = await cRes.json();
        if (Array.isArray(cData.countries) && cData.countries.length) state.countries = cData.countries;
      }
      if (tRes.ok) {
        const tData = await tRes.json();
        if (Array.isArray(tData.tariffs) && tData.tariffs.length) state.tariffsByCountry.ES = tData.tariffs;
      }
    } catch (_) { /* fallback to defaults */ }
  }

  function getCountry() {
    return state.countries.find(c => c.code === state.countryCode) || state.countries[0];
  }
  function getTariffs() {
    return state.tariffsByCountry[state.countryCode] || [];
  }

  function renderCountrySelect() {
    const sel = $('countrySelect');
    sel.innerHTML = state.countries.map(c => {
      const name = c.name[state.lang] || c.name.es || c.code;
      return `<option value="${escapeHtml(c.code)}" ${c.code===state.countryCode?'selected':''}>${escapeHtml(name)} (${escapeHtml(c.code)})</option>`;
    }).join('');
  }

  function syncCountryFields() {
    const c = getCountry();
    $('vat').value = +(c.vat * 100).toFixed(4);
    $('iee').value = +(c.electricity_tax * 100).toFixed(4);
    $('meter').value = c.meter_daily_eur ?? 0;
    if (c.default_power_kw.P1 != null) $('p1kw').value = c.default_power_kw.P1;
    if (c.default_power_kw.P2 != null) $('p2kw').value = c.default_power_kw.P2;
  }

  // ---------- TARIFF TABLE ----------
  function renderTariffTable() {
    const tariffs = getTariffs();
    const tbody = $('tariffTableBody');
    if (!tariffs.length) {
      tbody.innerHTML = `<tr><td colspan="5" class="empty-row">${state.lang==='en'?'No tariffs. Add one or import JSON.':'Sin tarifas. Añade una o importa JSON.'}</td></tr>`;
      return;
    }
    tbody.innerHTML = tariffs.map((tr, i) => `
      <tr>
        <td><strong>${escapeHtml(tr.company)}</strong></td>
        <td>${escapeHtml(tr.name)}${tr.sva_bundle?` <span class="pill bad">SVA</span>`:''}</td>
        <td><span class="pill ${escapeHtml(tr.type||'fijo')}">${escapeHtml(tr.type||'fijo')}</span></td>
        <td>${tr.source_url ? `<a class="link source-link" href="${escapeHtml(tr.source_url)}" target="_blank" rel="noopener">${state.lang==='en'?'source':'fuente'}</a>` : '<span class="micro">—</span>'}
            <div class="micro">${escapeHtml(tr.extracted_at||'')}</div></td>
        <td><button class="icon-btn" data-del="${i}" title="Delete">×</button></td>
      </tr>`).join('');
    tbody.querySelectorAll('[data-del]').forEach(btn => btn.addEventListener('click', () => {
      const idx = +btn.dataset.del;
      const arr = getTariffs();
      arr.splice(idx, 1);
      renderTariffTable();
      calculate();
    }));
  }

  // ---------- PROFILE / CALC ----------
  function readProfile() {
    const c = getCountry();
    const mode = document.querySelector('.mode-tab.active')?.dataset.mode || 'annual';
    const annualKwhInput = parseFloat($('annualKwh').value) || 0;
    const p1kwh = parseFloat($('p1kwh').value);
    const p2kwh = parseFloat($('p2kwh').value);
    const p3kwh = parseFloat($('p3kwh').value);
    let annualKwh = annualKwhInput;
    let split = { ...c.default_split };

    if (mode === 'bill3') {
      const bkwh = parseFloat($('billKwh').value) || 0;
      annualKwh = bkwh * 4;
      // bill amount is informational; we use kwh for comparison
    }

    const hasSplit = [p1kwh,p2kwh,p3kwh].every(v => isFinite(v) && v >= 0) && (p1kwh+p2kwh+p3kwh) > 0;
    let kwh = {};
    if (hasSplit) {
      kwh = { P1: p1kwh, P2: p2kwh, P3: p3kwh };
      annualKwh = p1kwh + p2kwh + p3kwh;
    } else {
      const periods = c.periods.length ? c.periods : ['P1'];
      // normalize split to available periods
      let sum = 0;
      periods.forEach(p => { split[p] = split[p] ?? (1/periods.length); sum += split[p]; });
      periods.forEach(p => { kwh[p] = annualKwh * (split[p] / (sum || 1)); });
    }

    const p1kw = Math.max(0, parseFloat($('p1kw').value) || 0);
    const p2kw = Math.max(0, parseFloat($('p2kw').value) || 0);
    const vat = Math.max(0, parseFloat($('vat').value) || 0) / 100;
    const iee = Math.max(0, parseFloat($('iee').value) || 0) / 100;
    const meter = Math.max(0, parseFloat($('meter').value) || 0);
    const currentCost = parseFloat($('currentCost').value);
    const bonoSocial = $('bonoSocial').checked;
    const cups = $('cups').value.trim();

    // Scenario modifiers
    const consDelta = (parseFloat($('consDelta').value) || 0) / 100;
    const solar = (parseFloat($('solar').value) || 0) / 100;
    const powerOpt = parseFloat($('powerOpt').value) || 0;
    const pool = parseFloat($('pool').value) || 100;

    const adjKwh = {};
    Object.keys(kwh).forEach(p => { adjKwh[p] = Math.max(0, kwh[p] * (1 + consDelta) * (1 - solar)); });
    const adjAnnual = Object.values(adjKwh).reduce((a,b)=>a+b,0);
    const adjP1kw = Math.max(0, p1kw + powerOpt);
    const adjP2kw = Math.max(0, p2kw + powerOpt);

    return {
      cups, annualKwh: adjAnnual, kwh: adjKwh, kw: { P1: adjP1kw, P2: adjP2kw },
      vat, iee, meter, currentCost: isFinite(currentCost) ? currentCost : null,
      bonoSocial, mode, pool,
      taxFactor: (1 + iee) * (1 + vat),
      country: c
    };
  }

  function annualCost(tariff, profile) {
    const days = 365;
    const periods = profile.country.periods.length ? profile.country.periods : ['P1'];
    const pPeriods = profile.country.power_periods.length ? profile.country.power_periods : [];
    let energyPrices = { ...(tariff.energy || {}) };

    // Tier rule (e.g. TotalEnergies <4000 / >=4000)
    if (tariff.tier_rule && tariff.tier_rule.type === 'annual_kwh') {
      const p = profile.annualKwh <= tariff.tier_rule.lte ? tariff.tier_rule.price_lte : tariff.tier_rule.price_gt;
      periods.forEach(k => { energyPrices[k] = p; });
    }

    // Indexed/quarterly scenario: rough pool-based adjustment around base price
    let scenario = null;
    if (tariff.type === 'indexada' || tariff.type === 'trimestral') {
      const basePool = 100;
      const factor = profile.pool / basePool;
      const avgFactor = profile.pool / basePool;
      const lowFactor = Math.max(0.5, (profile.pool * 0.7) / basePool);
      const stressFactor = (profile.pool * 1.3) / basePool;
      const calcWithFactor = (f) => {
        let e = 0;
        periods.forEach(p => { e += (profile.kwh[p] || 0) * ((energyPrices[p] ?? energyPrices.P1 ?? 0) * f); });
        let pw = 0;
        pPeriods.forEach(p => { pw += (profile.kw[p] || 0) * days * ((tariff.power||{})[p] ?? 0); });
        return (e + pw + (profile.meter * days)) * profile.taxFactor;
      };
      scenario = { low: calcWithFactor(lowFactor), avg: calcWithFactor(avgFactor), stress: calcWithFactor(stressFactor) };
      // use avg for ranking
      periods.forEach(k => { energyPrices[k] = (energyPrices[k] ?? energyPrices.P1 ?? 0) * avgFactor; });
    }

    let energy = 0;
    periods.forEach(p => { energy += (profile.kwh[p] || 0) * (energyPrices[p] ?? energyPrices.P1 ?? 0); });
    let power = 0;
    pPeriods.forEach(p => { power += (profile.kw[p] || 0) * days * ((tariff.power||{})[p] ?? 0); });
    const regulated = profile.meter * days;
    const subtotal = energy + power + regulated;
    const total = subtotal * profile.taxFactor;
    return { total, energy, power, regulated, taxFactor: profile.taxFactor, scenario };
  }

  function recommend(results, profile) {
    const minSavings = 100;
    const poolHigh = 80; // €/MWh reference threshold for indexed warning
    const current = profile.currentCost;
    let best = null;
    for (const r of results) {
      r.flags = [];
      r.verdict = 'ok';
      if (r.tariff.sva_bundle) { r.flags.push({type:'bad', text: state.lang==='en'?'SVA/bundle':'SVA/bundle'}); r.verdict = 'excluded'; }
      if ((r.tariff.type === 'indexada' || r.tariff.type === 'trimestral') && profile.pool > poolHigh) {
        r.flags.push({type:'warn', text: state.lang==='en'?`Pool risk ${profile.pool}€/MWh`:`Riesgo pool ${profile.pool}€/MWh`});
        if (r.verdict !== 'excluded') r.verdict = 'risky';
      }
      if (r.tariff.tier_rule) { r.flags.push({type:'warn', text: state.lang==='en'?'Tier rule':'Regla por consumo'}); }
      if (r.tariff.permanencia_meses > 0) { r.flags.push({type:'warn', text: state.lang==='en'?`${r.tariff.permanencia_meses}m lock-in`:`${r.tariff.permanencia_meses}m permanencia`}); }
      if (r.tariff.promo_until) { r.flags.push({type:'warn', text: state.lang==='en'?`Promo until ${r.tariff.promo_until}`:`Promo hasta ${r.tariff.promo_until}`}); }
      if (r.verdict !== 'excluded') {
        if (!best || r.total < best.total) best = r;
      }
    }

    // Compare vs current
    for (const r of results) {
      if (current != null) {
        r.diff = r.total - current;
        r.saving = current - r.total;
      } else {
        r.diff = null; r.saving = null;
      }
    }

    let verdictTitle, verdictBody, verdictIcon = '⚡';
    const curFmt = (v) => fmtEur(v, profile.country.currency, profile.country.locale);
    const bestEligible = best;
    if (!bestEligible) {
      verdictTitle = state.lang==='en' ? 'No eligible tariffs' : 'No hay tarifas elegibles';
      verdictBody = state.lang==='en' ? 'All tariffs were excluded by filters/rules. Add tariffs or review SVA/bundle flags.' : 'Todas las tarifas quedaron excluidas por filtros/reglas. Añade tarifas o revisa marcas SVA/bundle.';
      verdictIcon = '⚠️';
    } else if (current != null) {
      const saving = current - bestEligible.total;
      if (saving > minSavings) {
        verdictTitle = state.lang==='en' ? `Switch candidate: ${bestEligible.tariff.company}` : `Candidato a cambio: ${bestEligible.tariff.company}`;
        verdictBody = state.lang==='en'
          ? `${bestEligible.tariff.name} estimates ${curFmt(bestEligible.total)}/year vs your ${curFmt(current)}/year. Estimated saving: ${curFmt(saving)}/year. Ask for the offer in writing and check "cancel-and-rejoin" with your current retailer before switching.`
          : `${bestEligible.tariff.name} estima ${curFmt(bestEligible.total)}/año frente a tus ${curFmt(current)}/año. Ahorro estimado: ${curFmt(saving)}/año. Pide la oferta por escrito y revisa "baja y volver" con tu actual antes de cambiar.`;
        verdictIcon = '✅';
      } else {
        verdictTitle = state.lang==='en' ? `Likely keep current (check retention)` : `Probable quedarte (revisa retención)`;
        verdictBody = state.lang==='en'
          ? `Best eligible option is ${bestEligible.tariff.company} (${curFmt(bestEligible.total)}/year). Saving vs current is ${curFmt(Math.max(0,saving))}/year, below the ${minSavings} €/year threshold. Ask your current retailer to match or offer a "cancel-and-rejoin" deal.`
          : `La mejor opción elegible es ${bestEligible.tariff.company} (${curFmt(bestEligible.total)}/año). El ahorro vs actual es ${curFmt(Math.max(0,saving))}/año, por debajo del umbral de ${minSavings} €/año. Pide a tu actual que iguale o te ofrezca "baja y volver".`;
        verdictIcon = '🟡';
      }
    } else {
      verdictTitle = state.lang==='en' ? `Best estimate: ${bestEligible.tariff.company}` : `Mejor estimación: ${bestEligible.tariff.company}`;
      verdictBody = state.lang==='en'
        ? `${bestEligible.tariff.name} comes out lowest at ${curFmt(bestEligible.total)}/year for your profile. Add your current annual cost to get a switch/keep recommendation.`
        : `${bestEligible.tariff.name} sale la más baja con ${curFmt(bestEligible.total)}/año para tu perfil. Añade tu coste anual actual para obtener recomendación de cambio/quedarte.`;
      verdictIcon = '📊';
    }

    return { best: bestEligible, verdictTitle, verdictBody, verdictIcon };
  }

  function calculate() {
    const profile = readProfile();
    state.profile = profile;
    const tariffs = getTariffs();
    const results = tariffs.map(tariff => {
      const calc = annualCost(tariff, profile);
      return { tariff, ...calc };
    });
    results.sort((a,b) => a.total - b.total);
    state.results = results;
    const rec = recommend(results, profile);
    renderResults(results, profile, rec);
    renderCharts(results, profile);
    updateHero(results, profile, rec);
    updateShareText(results, profile, rec);
    updateEmailDraft(profile, rec.best);
  }

  function renderResults(results, profile, rec) {
    $('verdictIcon').textContent = rec.verdictIcon;
    $('verdictTitle').textContent = rec.verdictTitle;
    $('verdictBody').textContent = rec.verdictBody;

    const tbody = $('resultsBody');
    if (!results.length) {
      tbody.innerHTML = `<tr><td colspan="7" class="empty-row">${escapeHtml(t('r.empty'))}</td></tr>`;
      return;
    }
    const cur = profile.country.currency;
    const loc = profile.country.locale;
    tbody.innerHTML = results.map((r, i) => {
      const diff = r.diff == null ? '—' : (r.diff <= 0
        ? `<span style="color:#166534;font-weight:700">${fmtEur(r.diff,cur,loc)}</span>`
        : `<span style="color:#991b1b;font-weight:700">+${fmtEur(r.diff,cur,loc)}</span>`);
      const flags = r.flags.map(f => `<span class="pill ${f.type}">${escapeHtml(f.text)}</span>`).join(' ');
      const src = r.tariff.source_url ? `<a class="link source-link" href="${escapeHtml(r.tariff.source_url)}" target="_blank" rel="noopener">${escapeHtml(r.tariff.extracted_at||'source')}</a>` : '—';
      const bestMark = (rec.best && rec.best.tariff.id === r.tariff.id && r.verdict !== 'excluded') ? ' <span class="pill ok">BEST</span>' : '';
      const excl = r.verdict === 'excluded' ? ' style="opacity:.55"' : '';
      return `<tr${excl}>
        <td>${i+1}</td>
        <td><strong>${escapeHtml(r.tariff.company)}</strong><div class="micro">${escapeHtml(r.tariff.name)}${bestMark}</div></td>
        <td>${fmtEur(r.total,cur,loc)}${r.scenario?`<div class="micro">${state.lang==='en'?'range':'rango'} ${fmtEur(r.scenario.low,cur,loc)}–${fmtEur(r.scenario.stress,cur,loc)}</div>`:''}</td>
        <td>${fmtEur(r.total/12,cur,loc)}</td>
        <td>${diff}</td>
        <td><div class="flag-list">${flags || '<span class="micro">—</span>'}</div></td>
        <td>${src}</td>
      </tr>`;
    }).join('');
  }

  function renderCharts(results, profile) {
    const cur = profile.country.currency;
    const loc = profile.country.locale;
    // Ranking bar
    const labels = results.slice(0, 8).map(r => r.tariff.company);
    const data = results.slice(0, 8).map(r => +r.total.toFixed(0));
    const colors = results.slice(0,8).map((r,i) => r.verdict==='excluded' ? '#d1d5db' : (i===0 ? '#16a34a' : '#86d9a3'));
    if (window.Chart) {
      if (state.charts.ranking) state.charts.ranking.destroy();
      const ctx = $('rankingChart').getContext('2d');
      state.charts.ranking = new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets: [{ label: cur+'/year', data, backgroundColor: colors, borderRadius: 8, borderSkipped: false }] },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c) => fmtEur(c.raw, cur, loc) } } },
          scales: { x: { grid: { display:false } }, y: { ticks: { callback: v => fmtEur(v,cur,loc) }, grid: { color:'#edf2ef' } } }
        }
      });
    }

    // Split doughnut
    const periods = profile.country.periods.length ? profile.country.periods : ['P1'];
    const splitLabels = periods;
    const splitData = periods.map(p => Math.round(profile.kwh[p] || 0));
    const splitColors = ['#16a34a','#0ea5a4','#f59e0b','#6366f1','#ec4899'];
    if (window.Chart) {
      if (state.charts.split) state.charts.split.destroy();
      const ctx2 = $('splitChart').getContext('2d');
      state.charts.split = new Chart(ctx2, {
        type: 'doughnut',
        data: { labels: splitLabels, datasets: [{ data: splitData, backgroundColor: splitColors.slice(0, periods.length), borderWidth: 0 }] },
        options: { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ position:'bottom' } } }
      });
    }
    const total = splitData.reduce((a,b)=>a+b,0);
    $('splitNote').textContent = total > 0
      ? (state.lang==='en' ? `Total: ${Math.round(total)} kWh/year · split ${splitData.map((v,i)=>`${splitLabels[i]} ${Math.round(v/total*100)}%`).join(' / ')}`
                           : `Total: ${Math.round(total)} kWh/año · reparto ${splitData.map((v,i)=>`${splitLabels[i]} ${Math.round(v/total*100)}%`).join(' / ')}`)
      : '';
  }

  function updateHero(results, profile, rec) {
    const cur = profile.country.currency; const loc = profile.country.locale;
    $('hero-count').textContent = String(results.length);
    if (profile.currentCost != null) $('hero-current').textContent = fmtEur(profile.currentCost, cur, loc);
    else $('hero-current').textContent = fmtEur(results[0]?.total, cur, loc);
    if (rec.best) {
      $('hero-best').textContent = fmtEur(rec.best.total, cur, loc);
      const saving = profile.currentCost != null ? profile.currentCost - rec.best.total : 0;
      $('hero-saving').textContent = (profile.currentCost != null) ? fmtEur(Math.max(0, saving), cur, loc) : '—';
      $('hero-verdict').textContent = rec.verdictTitle;
    } else {
      $('hero-best').textContent = '—'; $('hero-saving').textContent = '—';
    }
  }

  function updateShareText(results, profile, rec) {
    const cur = profile.country.currency; const loc = profile.country.locale;
    const best = rec.best;
    const lines = [];
    lines.push(state.lang==='en' ? 'LuzLibre — summary' : 'LuzLibre — resumen');
    lines.push(`Date: 2026-11-24`);
    lines.push(`${state.lang==='en'?'Country':'País'}: ${profile.country.code}`);
    lines.push(`${state.lang==='en'?'Annual consumption':'Consumo anual'}: ${Math.round(profile.annualKwh)} kWh`);
    lines.push(`${state.lang==='en'?'Power':'Potencia'}: P1 ${profile.kw.P1} kW / P2 ${profile.kw.P2} kW`);
    if (profile.currentCost != null) lines.push(`${state.lang==='en'?'Current annual cost':'Coste anual actual'}: ${fmtEur(profile.currentCost,cur,loc)}`);
    if (best) {
      lines.push(`${state.lang==='en'?'Best eligible':'Mejor elegible'}: ${best.tariff.company} — ${best.tariff.name} = ${fmtEur(best.total,cur,loc)}/year`);
      if (profile.currentCost != null) lines.push(`${state.lang==='en'?'Estimated saving':'Ahorro estimado'}: ${fmtEur(Math.max(0, profile.currentCost-best.total),cur,loc)}/year`);
    }
    lines.push(`${state.lang==='en'?'Verdict':'Veredicto'}: ${rec.verdictTitle}`);
    lines.push('');
    lines.push(state.lang==='en' ? 'Top 3:' : 'Top 3:');
    results.slice(0,3).forEach((r,i) => lines.push(`${i+1}. ${r.tariff.company} - ${r.tariff.name}: ${fmtEur(r.total,cur,loc)}/year (${r.tariff.source_url||'no source'})`));
    lines.push('');
    lines.push(state.lang==='en' ? 'Verify every price on the official source and get the offer in writing before contracting.' : 'Verifica cada precio en la fuente oficial y pide la oferta por escrito antes de contratar.');
    $('shareText').value = lines.join('\n');
  }

  function updateEmailDraft(profile, bestTariffResult) {
    const c = profile.country;
    const isEn = state.lang === 'en';
    const company = bestTariffResult?.tariff?.company || (isEn ? '[Company]' : '[Compañía]');
    const tariffName = bestTariffResult?.tariff?.name || (isEn ? '[Tariff]' : '[Tarifa]');
    const to = bestTariffResult?.tariff?.email_contact || '';
    const cups = profile.cups || (isEn ? '[CUPS]' : '[CUPS]');
    const kwh = Math.round(profile.annualKwh);
    const subject = isEn
      ? `Written tariff offer request — ${company} ${tariffName}`
      : `Solicitud de oferta escrita — ${company} ${tariffName}`;
    const body = isEn
      ? `Hello ${company} team,\n\nI would like to request a written offer (by email) for the tariff "${tariffName}".\n\nMy consumption profile:\n- CUPS: ${cups}\n- Contracted power: P1 ${profile.kw.P1} kW / P2 ${profile.kw.P2} kW\n- Estimated annual consumption: ${kwh} kWh\n- Country/market: ${c.code}\n\nPlease confirm in writing:\n1) Energy price (€/kWh) by period and power price (€/kW·day), with and without taxes.\n2) Contract duration / lock-in and conditions.\n3) Whether any additional services (insurance/maintenance/SVA) are included or optional.\n4) The exact final price for my profile and the validity date of this offer.\n\nI prefer communication by email only. Thank you.\n\nBest regards,`
      : `Hola equipo de ${company},\n\nMe gustaría solicitar una oferta escrita (por email) para la tarifa "${tariffName}".\n\nMi perfil de consumo:\n- CUPS: ${cups}\n- Potencia contratada: P1 ${profile.kw.P1} kW / P2 ${profile.kw.P2} kW\n- Consumo anual estimado: ${kwh} kWh\n- País/mercado: ${c.code}\n\nPor favor, confirmad por escrito:\n1) Precio de energía (€/kWh) por periodo y precio de potencia (€/kW·día), con y sin impuestos.\n2) Permanencia, duración y condiciones.\n3) Si incluye servicios adicionales (seguros/mantenimiento/SVA) o si son opcionales.\n4) El precio final exacto para mi perfil y la fecha de validez de la oferta.\n\nPrefiero comunicación solo por email. Gracias.\n\nUn saludo,`;
    $('mailTo').value = to;
    $('mailSubject').value = subject;
    $('mailBody').value = body;
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    $('mailtoBtn').href = mailto;
  }

  // ---------- EVENTS ----------
  function bindEvents() {
    document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', () => {
      state.lang = btn.dataset.lang;
      applyI18n();
      renderCountrySelect();
      renderTariffTable();
      if (state.results.length) calculate(); else updateEmailDraft(readProfile(), null);
    }));

    $('countrySelect').addEventListener('change', (e) => {
      state.countryCode = e.target.value;
      syncCountryFields();
      renderTariffTable();
      calculate();
    });

    document.querySelectorAll('.mode-tab').forEach(btn => btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.mode;
      $('mode-annual').classList.toggle('hidden', mode !== 'annual');
      $('mode-bill3').classList.toggle('hidden', mode !== 'bill3');
    }));

    $('calcBtn').addEventListener('click', calculate);
    $('resetBtn').addEventListener('click', () => {
      $('cups').value=''; $('currentCost').value=''; $('annualKwh').value='3500';
      $('p1kwh').value=''; $('p2kwh').value=''; $('p3kwh').value='';
      $('billAmount').value=''; $('billKwh').value=''; $('bonoSocial').checked=false;
      $('consDelta').value=0; $('solar').value=0; $('pool').value=100; $('powerOpt').value=0;
      updateScenarioLabels();
      state.countryCode='ES'; renderCountrySelect(); syncCountryFields(); renderTariffTable();
      state.results=[]; $('resultsBody').innerHTML=`<tr><td colspan="7" class="empty-row">${escapeHtml(t('r.empty'))}</td></tr>`;
      $('verdictTitle').textContent=t('r.verdictPending'); $('verdictBody').textContent=t('r.verdictPendingBody'); $('verdictIcon').textContent='⚡';
      $('hero-current').textContent='—'; $('hero-best').textContent='—'; $('hero-saving').textContent='—'; $('hero-count').textContent=String(getTariffs().length);
      if (state.charts.ranking) { state.charts.ranking.destroy(); state.charts.ranking=null; }
      if (state.charts.split) { state.charts.split.destroy(); state.charts.split=null; }
      $('shareText').value=''; updateEmailDraft(readProfile(), null);
    });

    $('printBtn').addEventListener('click', () => window.print());

    // Scenario controls
    const updateScenarioLabels = () => {
      $('consDeltaVal').textContent = `${$('consDelta').value}%`;
      $('solarVal').textContent = `${$('solar').value}%`;
      $('poolVal').textContent = `${$('pool').value} €/MWh`;
      const po = parseFloat($('powerOpt').value);
      $('powerOptVal').textContent = `${po>0?'+':''}${po} kW`;
    };
    ['consDelta','solar','pool','powerOpt'].forEach(id => $(id).addEventListener('input', () => { updateScenarioLabels(); }));
    $('applyScenarioBtn').addEventListener('click', calculate);
    updateScenarioLabels();

    // Custom country
    $('applyCustomCountryBtn').addEventListener('click', () => {
      const code = ($('custCode').value.trim() || 'XX').toUpperCase();
      const cur = $('custCur').value.trim() || 'EUR';
      const vat = (parseFloat($('custVat').value)||0)/100;
      const et = (parseFloat($('custTax').value)||0)/100;
      const periods = $('custPeriods').value.split(',').map(s=>s.trim().toUpperCase()).filter(Boolean);
      const pList = periods.length ? periods : ['P1'];
      const split = {}; pList.forEach(p => split[p] = 1/pList.length);
      const existing = state.countries.find(c => c.code===code);
      const obj = { code, name:{es:`Personalizado ${code}`,en:`Custom ${code}`}, currency:cur, locale:'en-GB', vat, electricity_tax:et, meter_daily_eur:0, periods:pList, power_periods:[], default_power_kw:{}, default_split:split, notes:{es:'Mercado personalizado creado en modo creativo.', en:'Custom market created in creative mode.'}, regulator:{name:'',url:''} };
      if (existing) Object.assign(existing, obj); else state.countries.push(obj);
      if (!state.tariffsByCountry[code]) state.tariffsByCountry[code] = [];
      state.countryCode = code;
      renderCountrySelect(); syncCountryFields(); renderTariffTable(); calculate();
    });

    // Add tariff
    $('addTariffBtn').addEventListener('click', () => {
      const company = $('addCompany').value.trim();
      const name = $('addName').value.trim();
      if (!company || !name) return;
      const tarr = {
        id: `custom-${Date.now()}`, company, name, type: $('addType').value,
        energy: { P1: parseFloat($('addP1').value)||0, P2: parseFloat($('addP2').value)||parseFloat($('addP1').value)||0, P3: parseFloat($('addP3').value)||parseFloat($('addP1').value)||0 },
        power: { P1: parseFloat($('addPP1').value)||0, P2: parseFloat($('addPP2').value)||0 },
        permanencia_meses: 0, sva_bundle: $('addSva').checked, promo_until: null, tier_rule: null,
        source_url: $('addSource').value.trim(), extracted_at: new Date().toISOString().slice(0,10),
        notes: 'Added manually', email_contact: $('addEmail').value.trim()
      };
      if (!state.tariffsByCountry[state.countryCode]) state.tariffsByCountry[state.countryCode] = [];
      state.tariffsByCountry[state.countryCode].push(tarr);
      ['addCompany','addName','addP1','addP2','addP3','addPP1','addPP2','addSource','addEmail'].forEach(id => $(id).value='');
      $('addSva').checked = false;
      renderTariffTable(); calculate();
    });

    // Import/export
    $('importJson').addEventListener('change', async (e) => {
      const file = e.target.files?.[0]; if (!file) return;
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        const tariffs = Array.isArray(data) ? data : data.tariffs;
        if (Array.isArray(tariffs)) {
          state.tariffsByCountry[state.countryCode] = tariffs;
          renderTariffTable(); calculate();
        } else {
          alert(state.lang==='en' ? 'Invalid JSON: expected array or {tariffs:[...]}' : 'JSON inválido: se esperaba array o {tariffs:[...]}');
        }
      } catch (err) { alert('Import error: ' + err.message); }
      e.target.value = '';
    });
    $('exportDataBtn').addEventListener('click', () => {
      const data = { meta: { country: state.countryCode, exported_at: new Date().toISOString(), note: 'Community reference dataset - verify before contracting' }, tariffs: getTariffs() };
      const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `tariffs.${state.countryCode.toLowerCase()}.json`; a.click(); URL.revokeObjectURL(a.href);
    });

    $('copyShareBtn').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText($('shareText').value); $('copyShareBtn').textContent = state.lang==='en'?'Copied!':'¡Copiado!'; setTimeout(()=>applyI18n(),1200); }
      catch(_) { $('shareText').select(); document.execCommand('copy'); }
    });
    $('copyMailBtn').addEventListener('click', async () => {
      const txt = `To: ${$('mailTo').value}\nSubject: ${$('mailSubject').value}\n\n${$('mailBody').value}`;
      try { await navigator.clipboard.writeText(txt); $('copyMailBtn').textContent = state.lang==='en'?'Copied!':'¡Copiado!'; setTimeout(()=>applyI18n(),1200); }
      catch(_) {}
    });

    // Live email mailto update
    ['mailTo','mailSubject','mailBody'].forEach(id => $(id).addEventListener('input', () => {
      $('mailtoBtn').href = `mailto:${encodeURIComponent($('mailTo').value)}?subject=${encodeURIComponent($('mailSubject').value)}&body=${encodeURIComponent($('mailBody').value)}`;
    }));
  }

  // ---------- INIT ----------
  async function init() {
    await loadData();
    applyI18n();
    renderCountrySelect();
    syncCountryFields();
    renderTariffTable();
    bindEvents();
    $('hero-count').textContent = String(getTariffs().length);
    updateEmailDraft(readProfile(), null);
    calculate();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
