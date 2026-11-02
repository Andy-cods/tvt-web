// English content. Same shape as data.mjs (Vietnamese). Slugs stay identical so the language switch maps page to page.
export const services = [
  { slug: 'print-on-demand', code: 'POD', name: 'Print on Demand & Dropship', img: 'vase',
    short: 'List designs in your store. We print only when an order comes in and ship it to your customer under your brand.',
    intro: 'You sell, TVT makes. Every order placed in your store is routed to our studio, printed, finished, boxed with your label and delivered to your customer. No upfront stock, no inventory risk.',
    features: [['Printed per order', 'No minimum runs. Only the designs that sell get printed.'], ['White-label', 'Your box, label and thank-you card. Customers never see the TVT name.'], ['Order sync', 'Receive orders through a shared Google Sheet or an API for your own website.'], ['Product mockups', 'Clean product photos ready to list, free for your first 5 designs.']],
    specs: [['Minimum order', '1 piece'], ['Turnaround', '24 – 48 hours'], ['Channels', 'Shopee, TikTok Shop, Lazada, Etsy, your site'], ['Settlement', 'Weekly']],
    uses: ['Personalised decor', 'Limited art toy drops', 'Desk accessories', 'Name-printed gifts'] },
  { slug: 'in-fdm', code: 'FDM', name: 'Large-format FDM printing', img: 'gear',
    short: 'Durable, economical, multi-colour. For decor, enclosures, props and functional parts.',
    intro: 'FDM builds parts layer by layer from melted filament. It is the most economical choice for mid to large parts, strong under load, and works with engineering plastics such as PETG, ASA, TPU and carbon-fibre blends.',
    features: [['Large build volume', 'Up to 350 × 350 × 400 mm in one piece, larger parts printed in sections.'], ['Multi-colour', 'Up to 8 colours in one print, no painting needed.'], ['Engineering plastics', 'PETG-CF and Nylon-CF for strength, ASA for sun, TPU for flex.'], ['Cost-effective at size', 'Far cheaper than resin for parts over 15 cm.']],
    specs: [['Layer height', '0.08 – 0.28 mm'], ['Tolerance', '±0.2 mm'], ['Build volume', '350 × 350 × 400 mm'], ['Colours', 'Up to 8']],
    uses: ['Electronics enclosures', 'Cosplay props', 'Vases and planters', 'Jigs and fixtures'] },
  { slug: 'in-resin', code: 'MSLA', name: 'High-detail resin printing', img: 'toy',
    short: 'Porcelain-smooth surfaces that keep every texture and strand of hair. For figures, art toys, jewellery and casting.',
    intro: 'Resin printers use 8K–12K screens to cure liquid resin in layers just 0.03 mm thick. The result is crisp detail FDM cannot match, ideal for small parts that need finesse.',
    features: [['Extreme detail', '0.03 – 0.05 mm layers, layer lines practically invisible.'], ['Several resins', 'Standard, tough ABS-like, and castable wax for jewellery.'], ['Paint-ready', 'Smooth surface that needs only a light sand before painting.'], ['Casting patterns', 'Castable resin burns out clean for jewellery workshops.']],
    specs: [['Layer height', '0.03 – 0.05 mm'], ['Tolerance', '±0.1 mm'], ['Build volume', '220 × 130 × 250 mm'], ['Screen', '8K – 12K']],
    uses: ['Figures and art toys', 'Mini portrait busts', 'Jewellery masters', 'Tabletop and game models'] },
  { slug: 'thiet-ke-3d', code: 'CAD · SCULPT', name: '3D design & modelling', img: 'facet',
    short: 'From a photo, a sketch or a few lines of description, our 3D artists build a print-ready file.',
    intro: 'No 3D file? No problem. Our design team models from reference photos, sketches or technical drawings, sends renders for your approval, then optimises the file to print at its best.',
    features: [['Character sculpting', 'Figures, mascots and portraits from photos or concept art.'], ['Technical CAD', 'Parts designed to fit, exported as STEP.'], ['3D scanning', 'Scan an existing object to copy or modify it.'], ['File repair', 'Fix broken meshes, thicken thin walls, split for multi-part prints.']],
    specs: [['We accept', 'Images, PDF, DWG, STL, OBJ, STEP'], ['We deliver', 'STL, 3MF, STEP'], ['Revisions', '2 included'], ['Lead time', '1 – 5 days']],
    uses: ['Brand mascots', '3D logos', 'Replacement parts', 'Portrait figures'] },
  { slug: 'hau-ky-son', code: 'FINISH', name: 'Finishing & hand painting', img: 'knot',
    short: 'Sanding, priming, hand painting, airbrushing, gloss or matte coats. Ready to display straight out of the studio.',
    intro: 'Finishing decides whether a part looks 3D printed or looks like a finished piece. Our finishers prepare the surface, prime and paint by hand or airbrush to exactly the colours you specify.',
    features: [['Three finish levels', 'Raw (supports removed), smooth (sanded), fully painted.'], ['Pantone matching', 'Exact brand colours or character artbook palettes.'], ['Effects', 'Metal, stone, ceramic, pearl, rust, colour fades.'], ['Protective coats', 'Gloss, matte or satin, scratch and UV resistant.']],
    specs: [['Finish levels', 'Raw · Smooth · Painted'], ['Technique', 'Hand brush, airbrush'], ['Colour systems', 'Pantone, RAL'], ['Extra time', '1 – 3 days']],
    uses: ['Collector figures', 'Film props', 'Premium gifts', 'Display models'] },
  { slug: 'san-xuat-loat-nho', code: 'BATCH', name: 'Small-batch production', img: 'medal',
    short: 'From 10 to several thousand pieces with no tooling cost. Unit price drops with volume.',
    intro: 'For tens to thousands of parts, injection moulds are often too expensive and too slow. Our 24/7 print farm produces small batches faster, lets you change designs freely, and inspects every piece.',
    features: [['No tooling', 'Change the design mid-run without paying for new moulds.'], ['Tiered pricing', '15% off from 10 pieces, 28% from 50, up to 40% from 200.'], ['Every piece inspected', 'Dimensions and surface checked, batch photographed.'], ['Scheduled delivery', 'Split deliveries to match your project or event timeline.']],
    specs: [['Quantity', '10 – 5,000 pieces'], ['Discount', 'Up to 40%'], ['Capacity', '24/7 print farm'], ['Paperwork', 'Contract, VAT invoice']],
    uses: ['Event giveaways', 'Commemorative medals', 'Spare parts', 'Market-test products'] },
];

export const solutions = [
  { slug: 'seller-tmdt', name: 'E-commerce sellers', img: 'vase2', title: 'Grow your store without buying stock',
    desc: 'List dozens of designs at once and print only when they sell. TVT prints, packs under your brand and ships to your customers.',
    pain: ['Bulk stock ties up cash in a warehouse', 'Afraid to test new designs in case they flop', 'Packing and shipping eat your time'],
    points: ['Automatic orders via Google Sheet or API', 'White-label boxes with your own thank-you card', 'Mockup photos ready to list', 'Weekly settlement'],
    products: ['Name night lights', 'Mini planters', 'Phone stands', 'Custom keychains', 'Pet figurines'],
    stat: ['0 ₫', 'upfront inventory'], services: ['print-on-demand', 'in-fdm', 'thiet-ke-3d'] },
  { slug: 'nghe-si-creator', name: 'Artists & creators', img: 'toy', title: 'Bring your characters into the real world',
    desc: 'From digital sculpt to fully painted figure. Ideal for limited drops, crowdfunding and creative markets.',
    pain: ['Big factories won’t take runs of a few dozen', 'Worried about your files leaking', 'Hard to find painters who match your artbook'],
    points: ['8K resin keeps every detail', 'Hand painted to your artbook', 'Numbered editions, boxes and certificate cards', 'Your files stay private, never reprinted'],
    products: ['Art toys', 'Figures', 'Portrait busts', 'Jewellery', 'Game miniatures'],
    stat: ['0.05 mm', 'resin layer height'], services: ['in-resin', 'hau-ky-son', 'print-on-demand'] },
  { slug: 'doanh-nghiep-qua-tang', name: 'Corporate gifts', img: 'medal', title: 'Gifts that carry your brand',
    desc: 'Gifts designed around your identity, personalised with each recipient’s name, delivered on schedule with a VAT invoice.',
    pain: ['Generic gifts nobody remembers', 'Tight event deadlines', 'Need full contracts and paperwork'],
    points: ['Names and logos on every piece', 'Colours matched to your Pantone', 'Contracts, NDA and VAT invoices', 'Scheduled delivery to multiple sites'],
    products: ['Medals', 'Desk logos', 'Keychains', 'Lunar New Year gifts', 'Trophies'],
    stat: ['−40%', 'unit price from 200 pieces'], services: ['san-xuat-loat-nho', 'thiet-ke-3d', 'hau-ky-son'] },
  { slug: 'ky-thuat-prototype', name: 'Engineering & prototyping', img: 'gear', title: 'Shorten your product development loop',
    desc: 'Hold a prototype within 24 hours to test fit and ergonomics before investing in tooling.',
    pain: ['Prototype moulds cost too much', 'Waiting a week for CNC parts', 'Broken parts no longer sold'],
    points: ['Engineering plastics: PETG-CF, Nylon, ASA', '±0.2 mm tolerance, every part measured', 'STEP file repair and print optimisation', 'Same-day rush printing available'],
    products: ['Enclosures', 'Jigs & fixtures', 'Gears', 'Couplings', 'Spare parts'],
    stat: ['24 h', 'to your first prototype'], services: ['in-fdm', 'thiet-ke-3d', 'san-xuat-loat-nho'] },
  { slug: 'kien-truc-trung-bay', name: 'Architecture & display', img: 'arch', title: 'Models that win the room',
    desc: 'Architectural models, development site models and display pieces for showrooms and exhibitions.',
    pain: ['Handmade models take weeks', 'Facade detail is hard to show', 'Designs change and models must follow'],
    points: ['Scales from 1:50 to 1:1000', 'Large models printed in sections', 'Clean white or true-colour finish', 'Delivered and installed on site'],
    products: ['Site models', 'House models', 'POSM displays', 'Stage props'],
    stat: ['1:200', 'common scale for site models'], services: ['in-fdm', 'in-resin', 'hau-ky-son'] },
];

export const materials = [
  { n: 'PLA / PLA+', t: 'FDM', d: 2, b: 2, h: '55°C', u: 'Decor, models, gifts, indoor items', rate: 2400, note: 'Easy to print, many colours, silk and matte variants. Not for direct sun or hot cars.' },
  { n: 'PETG', t: 'FDM', d: 2, b: 4, h: '75°C', u: 'Boxes, holders, everyday items, water resistant', rate: 2900, note: 'Tougher than PLA, resists water and mild chemicals. Better for everyday use.' },
  { n: 'ASA / ABS', t: 'FDM', d: 2, b: 4, h: '95°C', u: 'Outdoor use, car parts, UV resistant', rate: 3400, note: 'ASA keeps its colour in the sun and handles heat well. The pick for outdoor parts.' },
  { n: 'TPU 95A', t: 'Flexible FDM', d: 2, b: 5, h: '80°C', u: 'Phone cases, gaskets, soles, elastic parts', rate: 4500, note: 'Rubber-like and unbreakable when bent. For parts that flex or absorb shock.' },
  { n: 'PETG-CF / Nylon-CF', t: 'Engineering FDM', d: 2, b: 5, h: '120°C', u: 'Gears, jigs, high-load parts', rate: 6500, note: 'Carbon-fibre filled for stiffness and a fine matte finish. Replaces light aluminium parts in many cases.' },
  { n: 'Standard 8K resin', t: 'MSLA', d: 5, b: 2, h: '50°C', u: 'Figures, art toys, detailed display pieces', rate: 6000, note: 'The sharpest detail and smoothest surface. More brittle than FDM plastics, best for display.' },
  { n: 'ABS-like resin', t: 'MSLA', d: 5, b: 3, h: '65°C', u: 'Detailed parts that need toughness, assemblies', rate: 7800, note: 'Resin-level detail with more toughness. Good for parts that snap together.' },
  { n: 'Castable wax resin', t: 'MSLA', d: 5, b: 1, h: '—', u: 'Jewellery casting patterns', rate: 12000, note: 'Burns out with no ash, used for lost-wax casting in jewellery workshops.' },
];

export const steps = [
  ['Send a file or an idea', 'STL, 3MF, reference photos or a hand sketch all work.', 'As soon as you send'],
  ['Review & quote', 'An engineer checks the file, advises on material and sends a detailed quote.', 'Within 2 business hours'],
  ['Approve the sample', 'A render or test print so you can sign off before production.', '50% deposit'],
  ['Production', 'Printed on our farm, with progress updates on Zalo.', '24 – 72 hours'],
  ['Finishing & QC', 'Surface finishing, measurement and inspection photos.', 'QC photos for every order'],
  ['Pack & ship', 'Shock-proof boxes with your brand, shipped nationwide.', '1 – 4 days'],
];

export const gallery = [
  { img: 'vase', title: 'Parametric twist vase', meta: 'Silk PLA · 0.16 mm · 26 cm', cat: 'decor' },
  { img: 'knot', title: 'Endless knot', meta: '8K resin · pearl paint', cat: 'nghe-thuat' },
  { img: 'toy', title: 'Art toy “Mochi”', meta: '8K resin · hand painted · 9 cm', cat: 'nghe-thuat' },
  { img: 'gear', title: 'Engineering gear', meta: 'PETG-CF · 100% infill', cat: 'ky-thuat' },
  { img: 'arch', title: '1:200 site model', meta: 'White PLA · 42 parts', cat: 'kien-truc' },
  { img: 'medal', title: 'Commemorative medal', meta: 'Multi-colour PLA · 500 pcs', cat: 'qua-tang' },
  { img: 'ring', title: 'Ring casting master', meta: 'Castable resin · 0.03 mm', cat: 'nghe-thuat' },
  { img: 'facet', title: 'Faceted solid', meta: 'ABS-like resin · 12 cm', cat: 'decor' },
  { img: 'armillary', title: 'Armillary sphere', meta: 'Silk PLA · 3-part assembly', cat: 'decor' },
  { img: 'vase2', title: 'Hexagonal planter', meta: 'PETG · sold via POD', cat: 'qua-tang' },
];
export const galleryCats = [['all', 'All'], ['decor', 'Decor'], ['nghe-thuat', 'Art'], ['qua-tang', 'Gifts'], ['ky-thuat', 'Engineering'], ['kien-truc', 'Architecture']];

export const plans = [
  { who: 'Individuals · artists', name: 'Single prints', price: 'From 30,000 ₫ / piece', sub: 'No minimum order', items: ['Free check and minor file repair', 'Material advice for your use case', 'QC photos before shipping'], cta: 'Send a file' },
  { who: 'Popular with sellers', name: 'POD Partner', price: 'Wholesale price per design', sub: 'No joining fee', hot: true, items: ['Printed per order, no inventory', 'White-label boxes, custom thank-you card', 'Orders via Google Sheet or API', 'Free mockups for your first 5 designs'], cta: 'Become a partner' },
  { who: 'Businesses', name: 'Projects', price: 'Quoted per project', sub: 'Contract, VAT invoice', items: ['Dedicated project manager', 'NDA for your designs', 'Batch production on schedule'], cta: 'Book a consultation' },
];

export const policies = [
  { slug: 'bao-mat-ban-quyen', name: 'File privacy & copyright', short: 'Your files are yours.', body: [
    ['Our privacy commitment', ['TVT never shares, sells or reprints customer designs for any third party.', 'Files are used only for the order you placed and only staff handling that order can access them.', 'After the order is complete you can ask us to delete your files.']],
    ['Non-disclosure agreements', ['For business orders and unreleased products, TVT signs an NDA, yours or ours, before receiving files.']],
    ['Intellectual property', ['You keep full rights to designs you provide.', 'For files TVT designs for you, usage rights pass to you once paid in full.', 'TVT may ask to photograph your product for our portfolio. You can say no.']],
    ['What we will not print', ['Products infringing others’ copyright or trademarks without a licence.', 'Weapons, weapon parts and items banned under Vietnamese law.', 'Offensive or inciting content, or content targeting individuals or organisations.']],
  ]},
  { slug: 'doi-tra-bao-hanh', name: 'Returns & warranty', short: 'Free reprint for any studio fault.', body: [
    ['Reporting window', ['Within 7 days of delivery, with an unboxing photo or video.']],
    ['Reprint or 100% refund when', ['Print defects: layer separation, warping, missing detail.', 'Dimensions outside the committed tolerance.', 'Wrong colour or material compared with the approved sample.']],
    ['Shipping damage', ['TVT handles the claim with the carrier and sends you a replacement without waiting for the outcome.']],
    ['Not covered', ['Faults in a customer-supplied file that TVT flagged before printing.', 'Damage from misuse or heat above the material’s rating.', 'Minor colour differences due to screen display.']],
  ]},
  { slug: 'van-chuyen', name: 'Shipping', short: 'Nationwide, shock-proof packaging.', body: [
    ['Delivery times', ['Same city: 1 – 2 days.', 'Other provinces: 2 – 4 days via GHN, GHTK, Viettel Post.', 'Same-day express available within the city.']],
    ['Shipping fees', ['Based on carrier rates, shown clearly in your quote.', 'Free shipping on orders from {freeShipFrom}.']],
    ['Packaging', ['Multi-layer cartons with foam or honeycomb paper per item.', 'Fragile parts and small pieces are secured individually.']],
    ['Dropship orders', ['Shipped straight to your customer with your label and card.', 'Tracking numbers are added to the shared order sheet as soon as parcels leave.']],
  ]},
  { slug: 'thanh-toan', name: 'Payment', short: '50% deposit, balance on delivery.', body: [
    ['Methods', ['Bank transfer.', 'E-wallets.', 'Cash on delivery for single orders under 2,000,000 ₫.']],
    ['Single prints and production', ['50% deposit on sample approval.', 'Balance before shipping or on delivery (COD).']],
    ['POD partners', ['Weekly settlement based on delivered orders.']],
    ['Invoices', ['VAT invoices on request. Please send your invoicing details when ordering.']],
  ]},
  { slug: 'thoi-gian-huy-don', name: 'Lead times & cancellation', short: 'On time, or a discount.', body: [
    ['Lead time commitment', ['Completion time is stated in your confirmed quote.', 'More than 48 hours late due to a studio fault: 10% off the order.']],
    ['Cancellation', ['Free cancellation before printing starts, full deposit refunded.', 'After printing starts, charges cover completed work and material used.', 'Design orders already in progress are charged for work done.']],
  ]},
  { slug: 'cam-ket-chat-luong', name: 'Quality commitment', short: '±0.2 mm tolerance on FDM.', body: [
    ['Dimensional tolerance', ['FDM: ±0.2 mm for parts under 100 mm, ±0.2% above.', 'Resin: ±0.1 mm for parts under 100 mm.']],
    ['Quality control', ['Every order is checked for surface and dimensions and photographed before packing.', 'QC photos and print settings (material, layer height, infill) are sent with the order.']],
  ]},
  { slug: 'dieu-khoan-su-dung', name: 'Terms of use', short: 'Rules for using our website and services.', body: [
    ['Scope', ['These terms apply to everyone using the TVT website and 3D printing services.']],
    ['Quotes and contracts', ['Prices on the website, including the estimator, are for reference only.', 'The binding price is the quote TVT sends after reviewing your file. Quotes are valid for 7 days.', 'An order is confirmed once you approve the sample and pay the deposit.']],
    ['Customer responsibilities', ['Provide accurate contact details.', 'Hold the legal rights to the designs you send.']],
    ['Disputes', ['Both parties will first negotiate in good faith. Otherwise disputes are settled under Vietnamese law.']],
  ]},
  { slug: 'quyen-rieng-tu', name: 'Privacy policy', short: 'How TVT collects and protects personal data.', body: [
    ['Data we collect', ['Name, phone number, email and delivery address when you contact us or order.', 'The design files and product descriptions you send.']],
    ['How we use it', ['Quoting, production, delivery and after-sales support.', 'Promotions, only if you opt in.']],
    ['Sharing', ['Only the delivery details a carrier needs.', 'We never sell or rent personal data.']],
    ['Your rights', ['Ask to view, correct or delete your personal data by contacting TVT.', 'This policy complies with Decree 13/2023/ND-CP on personal data protection.']],
  ]},
];

export const faq = [
  ['Ordering', [
    ['Can I print without a 3D file?', 'Yes. Send photos, a sketch or a description and our designers will model it and send a render for approval before printing. Design is quoted separately by complexity.'],
    ['Which file formats do you accept?', 'STL, OBJ, 3MF or STEP. If a file has mesh errors or walls that are too thin, we fix small issues free and tell you before any larger changes.'],
    ['Do you print a single piece?', 'Yes. There is no minimum order. Unit price drops as quantity grows.'],
    ['How fast will I get a quote?', 'Within 2 business hours of receiving your file and a full description.'],
  ]],
  ['POD & dropship', [
    ['How is POD different from bulk printing?', 'With POD you list products first and we print and ship only when an order comes in. No stock to buy, no inventory risk, and you can test many designs at once.'],
    ['Will my customers know TVT made it?', 'No. The box, shipping label and card all carry your brand.'],
    ['How do orders reach the studio?', 'Through a shared Google Sheet, or an API if you run your own website. We add tracking numbers to the same sheet.'],
  ]],
  ['Materials & quality', [
    ['Can you print multiple colours?', 'Yes. Our multi-colour FDM printers handle up to 8 colours per print. For gradients or complex detail we recommend hand painting.'],
    ['Are 3D printed parts durable?', 'It depends on the material. PETG and ASA work well outdoors, TPU is rubber-like, and carbon-fibre nylon handles load-bearing parts. Tell us the use and we will advise.'],
    ['Are prints food safe?', 'We do not recommend 3D printed parts for direct food contact, because layer lines can trap bacteria.'],
  ]],
  ['Shipping & payment', [
    ['How long until I receive my order?', 'Standard samples print in 24–72 hours, plus 1–4 days shipping. Same-day rush printing is available for a fee.'],
    ['Do you issue VAT invoices?', 'Yes, on request. Please send invoicing details when you order.'],
    ['How do I pay?', '50% deposit on sample approval, balance on delivery. Single orders under 2 million ₫ can be paid cash on delivery.'],
  ]],
];

export const articles = [
  { slug: 'chuan-bi-file-in-3d', title: 'How to prepare a file for 3D printing', img: 'facet', date: '2026-10-20', read: '5 min',
    excerpt: 'Five things to check before you send a file, so your part prints clean and to size.',
    body: [
      ['1. Export the right format', ['Use STL or 3MF for artistic models and STEP for technical parts. 3MF keeps colour and units, so prefer it when your software supports it.']],
      ['2. Check your units', ['The most common mistake is exporting in inches instead of millimetres, making the part 25 times too big or small. State the size you want when you send the file.']],
      ['3. Keep the mesh watertight', ['The model must be a closed solid with no holes or overlapping faces. Blender’s 3D Print Toolbox add-on checks this quickly.']],
      ['4. Respect minimum wall thickness', ['FDM needs walls of at least 1.2 mm and resin at least 0.8 mm. Thinner details break or fail to print.']],
      ['5. Tell us what it is for', ['Let us know if the part is for display, carries load or lives outdoors. Our engineers will pick the material, orientation and infill to suit.']],
    ] },
  { slug: 'chon-vat-lieu-in-3d', title: 'PLA, PETG or resin: which material?', img: 'knot', date: '2026-10-12', read: '6 min',
    excerpt: 'A quick comparison of common materials by detail, strength, heat resistance and price.',
    body: [
      ['When to choose PLA', ['Indoor display pieces, decor and models. PLA is cheap, colourful and easy to print, but softens around 55°C, so keep it out of cars and direct sun.']],
      ['When to choose PETG or ASA', ['Everyday items, tough parts and anything outdoors. ASA keeps its colour in the sun and handles heat up to about 95°C.']],
      ['When to choose resin', ['Small parts that need high detail, such as figures, jewellery and miniatures. Resin gives a smooth surface but is more brittle than FDM plastics.']],
      ['When to choose engineering plastics', ['Load-bearing parts, gears and production jigs. PETG-CF or Nylon-CF is stiff, light and heat resistant.']],
    ] },
  { slug: 'print-on-demand-la-gi', title: 'What is Print on Demand? Selling without stock using 3D printing', img: 'vase2', date: '2026-10-02', read: '4 min',
    excerpt: 'POD lets sellers test many designs without buying inventory. Here is how it works.',
    body: [
      ['How POD works', ['You list products using mockup photos. When a customer orders, the order goes to the print studio, which produces it, packs it under your brand and ships it to the customer.']],
      ['Benefits', ['No inventory cash, no risk of unsold stock.', 'Test dozens of designs at once and keep the best sellers.', 'Easy personalisation: names and colours per order.']],
      ['3D printed products that suit POD', ['Night lights, mini planters, phone stands, name keychains, pet figurines from photos, desk accessories.']],
      ['Getting started with TVT', ['Sign up for POD Partner, send your first 5 designs for free mockups, then connect the shared order sheet.']],
    ] },
];
