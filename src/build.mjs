// Sinh toàn bộ trang HTML tĩnh (tiếng Việt ở gốc, tiếng Anh ở /en/) vào thư mục public/.
// Chạy: node src/build.mjs   (Node 18+, không cần cài thư viện)
import { writeFileSync, readdirSync, unlinkSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import * as vi from './data.mjs';
import * as en from './data.en.mjs';

const site = vi.site;
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.min.js';
const YEAR = 2026;

/* ---------------- Chuỗi giao diện ---------------- */
const UI = {
  vi: {
    locale: 'vi_VN', skip: 'Bỏ qua tới nội dung', home: 'Trang chủ', homeAria: 'TVT trang chủ', openMenu: 'Mở menu',
    nav: { svc: 'Dịch vụ', sol: 'Giải pháp', work: 'Tác phẩm', mat: 'Vật liệu', quote: 'Báo giá', learn: 'Kiến thức', about: 'Về TVT', contact: 'Liên hệ' },
    allSvc: 'Tất cả dịch vụ →', allSol: 'Tất cả giải pháp →', sendFile: 'Gửi file in', langName: 'English', langShort: 'EN', langAria: 'View in English',
    footBlurb: 'Xưởng in 3D theo yêu cầu. Từ một mẫu thử đến nghìn sản phẩm, in khi bạn cần.', hotline: 'Hotline / Zalo', email: 'Email',
    phPhone: 'số điện thoại', phEmail: 'email', phEmail2: 'email liên hệ', phAddr: 'địa chỉ xưởng', phFree: 'mức đơn',
    footPol: 'Chính sách', footAbout: 'Về chúng tôi', process: 'Quy trình', faq: 'Hỏi đáp',
    titleHome: 'TVT · In 3D theo yêu cầu, Print on Demand', titleSuffix: 'TVT 3D Print Atelier',
    bizDesc: 'Xưởng in 3D theo yêu cầu và Print on Demand.',
    matCols: ['Vật liệu', 'Chi tiết', 'Độ bền', 'Chịu nhiệt', 'Hợp nhất cho'], of5: 'trên 5',
    podLabel: 'Dịch vụ chủ lực', podTitle: 'Print on Demand &amp; Dropship',
    podLead: 'Đăng mẫu lên gian hàng của bạn, có đơn TVT mới in. Sản phẩm được hoàn thiện, đóng hộp mang thương hiệu của bạn và giao thẳng tới khách. Bạn không cần nhập hàng, cũng không lo tồn kho.',
    podTags: ['Shopee', 'TikTok Shop', 'Lazada', 'Etsy', 'Website riêng'], podMore: 'Tìm hiểu POD', podFlowAria: 'Luồng xử lý đơn POD',
    podFlow: [['00:00', 'Khách đặt hàng trên gian hàng của bạn', 'đơn mới'], ['00:05', 'Đơn tự động chuyển về xưởng TVT', 'đồng bộ'], ['+24 h', 'In, hoàn thiện, kiểm tra chất lượng', 'ảnh QC'], ['+30 h', 'Đóng hộp với nhãn và thiệp của bạn', 'white-label'], ['+2–4 ngày', 'Giao tận tay khách hàng', 'toàn quốc']],
    q: { size: 'Kích thước lớn nhất', mat: 'Vật liệu', fill: 'Độ đặc', fills: ['Vỏ mỏng', 'Tiêu chuẩn', 'Đặc, chịu lực'], fin: 'Hoàn thiện', fins: ['Thô', 'Chà mịn', 'Sơn tay'], qty: 'Số lượng', price: 'Giá tham khảo / sản phẩm', note: 'Giá tham khảo để bạn hình dung chi phí. Báo giá chính thức được gửi sau khi kỹ sư kiểm tra file.', cta: 'Gửi file để chốt giá' },
    ctaLabel: 'Bắt đầu', ctaH: 'Có ý tưởng? <em class="pearl">Hãy cho nó hình hài.</em>', ctaQuote: 'Ước tính giá', more: 'Xem chi tiết',
    galNote: 'Ảnh render minh hoạ. Thay bằng ảnh chụp sản phẩm thật trong <span class="mono">public/assets/img/</span>.', filterAria: 'Lọc theo lĩnh vực',
    updated: 'Cập nhật', polContact: (p, e) => `Có thắc mắc về chính sách? Gọi hoặc nhắn Zalo ${p}, email ${e}.`, contactH: 'Liên hệ', polNav: 'Các chính sách', artNav: 'Bài viết khác', postsLabel: 'Bài viết', readSuffix: 'đọc',
    stageAria: 'Mô phỏng một chiếc bình đang được in 3D từng lớp', layer: 'Lớp', readoutMat: 'Resin ánh ngọc · 0,05 mm',
    facts: [['0,05 mm', 'Độ dày lớp in resin'], ['01', 'Sản phẩm là đủ để đặt in'], ['12+', 'Vật liệu nhựa và resin'], ['24–72 h', 'Thời gian in mẫu']],
    form: { name: 'Tên của bạn', phone: 'Số Zalo', svc: 'Dịch vụ', qty: 'Số lượng dự kiến', desc: 'Mô tả sản phẩm', descPh: 'Ví dụ: tượng mèo cao 12 cm, resin, sơn màu cam, cần trong 5 ngày.', namePh: 'Nguyễn Văn A', phonePh: '09xx xxx xxx', err: 'Vui lòng điền tên và số Zalo để TVT liên hệ lại.', submit: 'Tạo brief', ready: 'Brief đã sẵn sàng. Sao chép rồi gửi qua Zalo hoặc email, nhớ đính kèm file thiết kế.', copy: 'Sao chép brief', zalo: 'Mở Zalo', mail: 'Gửi email', extra: ['Quà tặng doanh nghiệp', 'Khác'] },
    js: { copy: 'Sao chép brief', copied: 'Đã sao chép', selected: 'Đã chọn sẵn, nhấn Ctrl+C', total: 'Tổng', items: 'sản phẩm', about: 'khoảng', vol: 'Thể tích ước tính', time: 'Thời gian in / sản phẩm', hours: 'giờ', disc: 'Chiết khấu số lượng', brief: 'BRIEF IN 3D GỬI TVT', bName: 'Tên', bZalo: 'Zalo', bSvc: 'Dịch vụ', bQty: 'Số lượng', bDesc: 'Mô tả', none: '(chưa có)', est: 'Ước tính đã xem', subj: 'Brief in 3D', per: 'sp', qtyShort: 'SL', open: 'Mở menu', close: 'Đóng menu', numLocale: 'vi-VN', cur: 'đ', decimal: ',' },
  },
  en: {
    locale: 'en_US', skip: 'Skip to content', home: 'Home', homeAria: 'TVT home', openMenu: 'Open menu',
    nav: { svc: 'Services', sol: 'Solutions', work: 'Work', mat: 'Materials', quote: 'Pricing', learn: 'Guides', about: 'About', contact: 'Contact' },
    allSvc: 'All services →', allSol: 'All solutions →', sendFile: 'Send a file', langName: 'Tiếng Việt', langShort: 'VI', langAria: 'Xem bản tiếng Việt',
    footBlurb: 'An on-demand 3D printing studio. From one prototype to a thousand pieces, printed when you need them.', hotline: 'Phone / Zalo', email: 'Email',
    phPhone: 'phone number', phEmail: 'email', phEmail2: 'contact email', phAddr: 'studio address', phFree: 'order amount',
    footPol: 'Policies', footAbout: 'About us', process: 'Process', faq: 'FAQ',
    titleHome: 'TVT · On-demand 3D printing & Print on Demand', titleSuffix: 'TVT 3D Print Atelier',
    bizDesc: 'On-demand 3D printing and Print on Demand studio.',
    matCols: ['Material', 'Detail', 'Strength', 'Heat', 'Best for'], of5: 'out of 5',
    podLabel: 'Flagship service', podTitle: 'Print on Demand &amp; Dropship',
    podLead: 'List designs in your store and we print only when an order comes in. Each piece is finished, boxed under your brand and shipped straight to your customer. No stock to buy, no inventory to worry about.',
    podTags: ['Shopee', 'TikTok Shop', 'Lazada', 'Etsy', 'Your website'], podMore: 'About POD', podFlowAria: 'POD order flow',
    podFlow: [['00:00', 'A customer orders from your store', 'new order'], ['00:05', 'The order syncs to the TVT studio', 'synced'], ['+24 h', 'Printed, finished, quality checked', 'QC photo'], ['+30 h', 'Boxed with your label and card', 'white-label'], ['+2–4 days', 'Delivered to your customer', 'nationwide']],
    q: { size: 'Largest dimension', mat: 'Material', fill: 'Infill', fills: ['Thin shell', 'Standard', 'Solid, load-bearing'], fin: 'Finish', fins: ['Raw', 'Sanded', 'Hand painted'], qty: 'Quantity', price: 'Estimated price / piece', note: 'An estimate to help you plan. Your binding quote is sent after an engineer reviews the file.', cta: 'Send a file for a quote' },
    ctaLabel: 'Get started', ctaH: 'Have an idea? <em class="pearl">Give it form.</em>', ctaQuote: 'Estimate price', more: 'Learn more',
    galNote: 'Illustrative renders. Replace with real product photos in <span class="mono">public/assets/img/</span>.', filterAria: 'Filter by field',
    updated: 'Updated', polContact: (p, e) => `Questions about our policies? Call or message ${p} on Zalo, or email ${e}.`, contactH: 'Contact', polNav: 'Policies', artNav: 'More guides', postsLabel: 'Guides', readSuffix: 'read',
    stageAria: 'A vase being 3D printed layer by layer', layer: 'Layer', readoutMat: 'Pearl resin · 0.05 mm',
    facts: [['0.05 mm', 'Resin layer height'], ['01', 'Piece is enough to order'], ['12+', 'Plastics and resins'], ['24–72 h', 'Sample lead time']],
    form: { name: 'Your name', phone: 'Zalo / phone', svc: 'Service', qty: 'Expected quantity', desc: 'Describe your product', descPh: 'E.g. cat figure, 12 cm tall, resin, painted orange, needed in 5 days.', namePh: 'Jane Nguyen', phonePh: '+84 9xx xxx xxx', err: 'Please enter your name and phone so TVT can get back to you.', submit: 'Create brief', ready: 'Your brief is ready. Copy it and send via Zalo or email, with your design file attached.', copy: 'Copy brief', zalo: 'Open Zalo', mail: 'Send email', extra: ['Corporate gifts', 'Other'] },
    js: { copy: 'Copy brief', copied: 'Copied', selected: 'Selected, press Ctrl+C', total: 'Total for', items: 'pieces', about: 'about', vol: 'Estimated volume', time: 'Print time / piece', hours: 'h', disc: 'Volume discount', brief: '3D PRINT BRIEF FOR TVT', bName: 'Name', bZalo: 'Zalo / phone', bSvc: 'Service', bQty: 'Quantity', bDesc: 'Description', none: '(none)', est: 'Estimate viewed', subj: '3D print brief', per: 'pc', qtyShort: 'qty', open: 'Open menu', close: 'Close menu', numLocale: 'en-US', cur: ' ₫', decimal: '.' },
  },
};

// Nội dung riêng từng trang (tiêu đề, mô tả, đoạn dẫn).
const P = {
  vi: {
    home: { desc: 'TVT in 3D theo yêu cầu cho nghệ sĩ, nhà bán hàng và doanh nghiệp. Print on Demand không tồn kho, in resin siêu chi tiết, FDM khổ lớn, thiết kế 3D và sơn hoàn thiện.', label: 'TVT · Xưởng in 3D theo yêu cầu', h1: 'In ra những điều <em class="pearl">chưa từng tồn tại.</em>', lead: 'TVT biến bản phác thảo, file 3D hay chỉ một ý tưởng thành vật thể hoàn thiện, cho nghệ sĩ, nhà bán hàng và thương hiệu. In từ một chiếc, không tồn kho.', cta1: 'Ước tính chi phí', cta2: 'Xem tác phẩm',
      svcH: 'Bạn giữ ý tưởng.<br><em>Phần còn lại để TVT.</em>', solH: 'Mỗi người làm nghề <em>một cách in riêng.</em>', solAria: 'Giải pháp theo khách hàng', solProducts: 'Sản phẩm tiêu biểu', solMore: 'Xem giải pháp', procH: 'Sáu bước, <em>minh bạch từ đầu đến cuối.</em>', procMore: 'Chi tiết quy trình và thời gian', workH: 'Ra lò tại <em>xưởng TVT.</em>', workMore: 'Xem tất cả tác phẩm', matH: 'Chất liệu quyết định <em>cảm giác cầm trên tay.</em>', matLead: 'Chưa chắc chọn loại nào? Ghi công dụng sản phẩm khi gửi file, kỹ sư TVT sẽ đề xuất.', quoteH: 'Ước tính chi phí <em>trong mười giây.</em>', faqH: 'Những điều <em>bạn hay hỏi.</em>', faqMore: 'Xem tất cả câu hỏi' },
    svc: { title: 'Dịch vụ', desc: 'Dịch vụ in 3D của TVT: Print on Demand, in FDM khổ lớn, in resin siêu chi tiết, thiết kế 3D, sơn hoàn thiện và sản xuất loạt nhỏ.', h1: 'Một xưởng, <em>đủ mọi công đoạn.</em>', lead: 'Từ file thiết kế đến hộp giao hàng. Chọn dịch vụ bạn cần, hoặc kết hợp nhiều dịch vụ trong một đơn.', allLabel: 'Tất cả dịch vụ', allH: 'Chọn đúng công nghệ <em>cho từng sản phẩm.</em>',
      quote: 'Nhận báo giá', est: 'Ước tính giá', featLabel: 'Điểm nổi bật', featH: (n) => `Vì sao chọn <em>${n.toLowerCase()}</em> tại TVT`, specs: 'Thông số', uses: 'Thường dùng cho', procH: 'Đặt in <em>trong sáu bước.</em>', relLabel: 'Giải pháp liên quan', relH: 'Dịch vụ này <em>phục vụ ai.</em>', otherLabel: 'Dịch vụ khác', otherH: 'Kết hợp để <em>hoàn thiện sản phẩm.</em>' },
    sol: { title: 'Giải pháp', desc: 'Giải pháp in 3D cho seller TMĐT, nghệ sĩ, doanh nghiệp, kỹ sư và kiến trúc sư.', h1: 'Mỗi người làm nghề <em>một cách in riêng.</em>', lead: 'TVT điều chỉnh vật liệu, quy trình và cách giao hàng theo đúng mô hình kinh doanh của bạn.', consult: 'Tư vấn miễn phí', pain: 'Bạn đang gặp', fix: 'TVT giải quyết', products: 'Sản phẩm tiêu biểu', svcLabel: 'Dịch vụ sử dụng', svcH: 'Ghép từ <em>những dịch vụ này.</em>', plansLabel: 'Gói hợp tác', plansH: 'Bắt đầu <em>không mất phí.</em>' },
    work: { title: 'Tác phẩm', desc: 'Bộ sưu tập sản phẩm in 3D tại xưởng TVT: decor, art toy, quà tặng, chi tiết kỹ thuật và mô hình kiến trúc.', h1: 'Ra lò tại <em>xưởng TVT.</em>', lead: 'Một phần các sản phẩm TVT đã in và hoàn thiện. Lọc theo lĩnh vực để xem sản phẩm gần với nhu cầu của bạn.', cta: 'Muốn sản phẩm tiếp theo <em class="pearl">là của bạn?</em>' },
    mat: { title: 'Vật liệu', desc: 'So sánh vật liệu in 3D tại TVT: PLA, PETG, ASA, TPU, nhựa sợi carbon và các loại resin.', h1: 'Chất liệu quyết định <em>cảm giác cầm trên tay.</em>', lead: 'Mỗi vật liệu có thế mạnh riêng về độ chi tiết, độ bền và chịu nhiệt. Bảng dưới giúp bạn chọn nhanh.', notesLabel: 'Ghi chú', notesH: 'Hiểu thêm về <em>từng vật liệu.</em>', guide: 'Đọc hướng dẫn chọn vật liệu' },
    quote: { title: 'Báo giá', desc: 'Ước tính chi phí in 3D trong 10 giây theo kích thước, vật liệu, độ đặc, hoàn thiện và số lượng. Xem các gói hợp tác của TVT.', h1: 'Ước tính chi phí <em>trong mười giây.</em>', lead: 'Kéo thanh trượt để xem giá tham khảo. Báo giá chính thức được gửi trong 2 giờ làm việc sau khi kỹ sư xem file.', plansLabel: 'Gói hợp tác', plansH: 'Bắt đầu từ một chiếc, <em>lớn lên cùng TVT.</em>', depends: 'Giá phụ thuộc vào', dependsList: ['Thể tích nhựa thực tế và độ đặc bên trong', 'Vật liệu và độ dày lớp in', 'Mức hoàn thiện: thô, chà mịn hay sơn tay', 'Số lượng: giảm 15% từ 10 chiếc, 28% từ 50, 40% từ 200'], tiers: 'Chiết khấu theo số lượng', tierRows: [['1 – 9', 'Giá gốc'], ['10 – 49', '−15%'], ['50 – 199', '−28%'], ['200+', '−40%']] },
    proc: { title: 'Quy trình', desc: 'Quy trình đặt in 3D tại TVT trong 6 bước: gửi file, báo giá, duyệt mẫu, sản xuất, QC và giao hàng.', h1: 'Sáu bước, <em>minh bạch từ đầu đến cuối.</em>', lead: 'Bạn luôn biết đơn hàng đang ở đâu. Mỗi bước có thời gian cam kết và ảnh cập nhật qua Zalo.', prep: 'Bạn cần chuẩn bị', prepList: ['File 3D (STL, 3MF, OBJ, STEP) hoặc ảnh tham khảo', 'Kích thước mong muốn, tính bằng milimét', 'Công dụng: trưng bày, chịu lực, để ngoài trời', 'Số lượng và thời hạn cần hàng'], guide: 'Hướng dẫn chuẩn bị file in', times: 'Thời gian tham khảo', timeRows: [['Báo giá', 'Trong 2 giờ làm việc'], ['Thiết kế 3D', '1 – 5 ngày'], ['In mẫu', '24 – 72 giờ'], ['Sơn hoàn thiện', 'Thêm 1 – 3 ngày'], ['Giao hàng', '1 – 4 ngày']] },
    pol: { title: 'Chính sách', desc: 'Chính sách bảo mật, đổi trả, vận chuyển, thanh toán, huỷ đơn, cam kết chất lượng, điều khoản và quyền riêng tư của TVT.', h1: 'Rõ ràng <em>trước khi bạn đặt đơn.</em>', lead: 'Mọi cam kết của TVT về bảo mật, chất lượng, giao hàng và thanh toán.', descOf: (n, s) => `${n} của TVT 3D Print Atelier. ${s}` },
    faq: { title: 'Hỏi đáp', desc: 'Câu hỏi thường gặp về đặt in 3D, Print on Demand, vật liệu, chất lượng, giao hàng và thanh toán tại TVT.', h1: 'Những điều <em>bạn hay hỏi.</em>', lead: 'Chưa thấy câu hỏi của bạn? Nhắn Zalo, kỹ sư trả lời trong giờ làm việc.' },
    learn: { title: 'Kiến thức', desc: 'Hướng dẫn và kiến thức in 3D: chuẩn bị file, chọn vật liệu, mô hình Print on Demand.', h1: 'Hiểu in 3D <em>để đặt in đúng.</em>', lead: 'Hướng dẫn ngắn giúp bạn chuẩn bị file, chọn vật liệu và bắt đầu bán hàng với POD.' },
    about: { title: 'Về chúng tôi', desc: 'TVT là xưởng in 3D theo yêu cầu, kết hợp kỹ thuật in chính xác với tay nghề hoàn thiện thủ công.', label: 'Về TVT', h1: 'Nơi kỹ thuật <em>gặp nghệ thuật.</em>', lead: 'TVT là xưởng in 3D theo yêu cầu. Chúng tôi kết hợp máy in chính xác với tay nghề hoàn thiện thủ công, để mỗi sản phẩm vừa đúng kỹ thuật vừa có hồn.', facts: [['0,03 mm', 'Lớp in mỏng nhất'], ['24/7', 'Dàn máy vận hành'], ['12+', 'Vật liệu sẵn có'], ['63', 'Tỉnh thành giao hàng']], valLabel: 'Giá trị', valH: 'Ba điều <em>TVT giữ vững.</em>', values: [['Chính xác', 'Mỗi đơn được kiểm kích thước và chụp ảnh nghiệm thu. Dung sai được cam kết bằng văn bản.'], ['Tận tâm', 'Kỹ sư tư vấn vật liệu theo đúng công dụng, sửa file miễn phí với lỗi nhỏ, cập nhật tiến độ từng bước.'], ['Bảo mật', 'File của bạn chỉ dùng cho đơn của bạn. Ký NDA khi cần, không bao giờ in lại cho người khác.']], visitLabel: 'Xưởng', visitH: 'Ghé thăm <em>xưởng TVT.</em>', visitLead: 'Đặt lịch trước để xem máy in, mẫu vật liệu và trao đổi trực tiếp với kỹ sư.', addr: 'Địa chỉ', hours: 'Giờ làm', hotline: 'Hotline' },
    contact: { title: 'Liên hệ', desc: 'Liên hệ TVT để nhận báo giá in 3D trong 2 giờ làm việc. Gửi file hoặc mô tả ý tưởng qua Zalo, email.', h1: 'Có ý tưởng? <em class="pearl">Hãy cho nó hình hài.</em>', lead: 'Điền vài dòng mô tả, trang sẽ tạo sẵn bản brief để bạn gửi qua Zalo hoặc email kèm file. Báo giá trong 2 giờ làm việc.', info: 'Thông tin', studio: 'Xưởng', hours: 'Giờ làm', faqLabel: 'Trước khi gửi', faqH: 'Câu hỏi <em>thường gặp.</em>' },
    nf: { title: 'Không tìm thấy trang', desc: 'Trang bạn tìm không tồn tại.', label: 'Lỗi 404', lead: 'Trang này chưa được in ra. Có thể đường dẫn đã thay đổi hoặc không còn tồn tại.', back: 'Về trang chủ' },
    hours: site.hours,
  },
  en: {
    home: { desc: 'TVT is an on-demand 3D printing studio for artists, sellers and brands. Inventory-free Print on Demand, high-detail resin, large-format FDM, 3D design and hand finishing.', label: 'TVT · On-demand 3D printing studio', h1: 'Printing things <em class="pearl">that never existed.</em>', lead: 'TVT turns a sketch, a 3D file or just an idea into a finished object, for artists, sellers and brands. From a single piece, with no inventory.', cta1: 'Estimate cost', cta2: 'See our work',
      svcH: 'You keep the idea.<br><em>We handle the rest.</em>', solH: 'Every craft, <em>its own way to print.</em>', solAria: 'Solutions by customer', solProducts: 'Typical products', solMore: 'View solution', procH: 'Six steps, <em>transparent end to end.</em>', procMore: 'Process and lead times in detail', workH: 'Made at <em>the TVT studio.</em>', workMore: 'See all work', matH: 'Material shapes <em>how it feels in your hand.</em>', matLead: 'Not sure which to pick? Tell us what the part is for and our engineers will recommend one.', quoteH: 'Estimate your cost <em>in ten seconds.</em>', faqH: 'Things <em>you often ask.</em>', faqMore: 'See all questions' },
    svc: { title: 'Services', desc: 'TVT 3D printing services: Print on Demand, large-format FDM, high-detail resin, 3D design, finishing and small-batch production.', h1: 'One studio, <em>every step covered.</em>', lead: 'From design file to delivery box. Pick the service you need, or combine several in one order.', allLabel: 'All services', allH: 'The right technology <em>for every product.</em>',
      quote: 'Get a quote', est: 'Estimate price', featLabel: 'Highlights', featH: (n) => `Why choose TVT for <em>${n.toLowerCase()}</em>`, specs: 'Specifications', uses: 'Common uses', procH: 'Order <em>in six steps.</em>', relLabel: 'Related solutions', relH: 'Who this service <em>is for.</em>', otherLabel: 'Other services', otherH: 'Combine them <em>to finish your product.</em>' },
    sol: { title: 'Solutions', desc: '3D printing solutions for e-commerce sellers, artists, businesses, engineers and architects.', h1: 'Every craft, <em>its own way to print.</em>', lead: 'TVT adapts materials, process and delivery to the way your business works.', consult: 'Free consultation', pain: 'What you face', fix: 'How TVT solves it', products: 'Typical products', svcLabel: 'Services used', svcH: 'Built from <em>these services.</em>', plansLabel: 'Partnership plans', plansH: 'Start <em>with no fees.</em>' },
    work: { title: 'Work', desc: 'A collection of 3D printed pieces from the TVT studio: decor, art toys, gifts, engineering parts and architectural models.', h1: 'Made at <em>the TVT studio.</em>', lead: 'A selection of pieces TVT has printed and finished. Filter by field to find work close to what you need.', cta: 'Want the next piece <em class="pearl">to be yours?</em>' },
    mat: { title: 'Materials', desc: 'Compare 3D printing materials at TVT: PLA, PETG, ASA, TPU, carbon-fibre blends and resins.', h1: 'Material shapes <em>how it feels in your hand.</em>', lead: 'Each material has its own strengths in detail, strength and heat resistance. The table below helps you choose quickly.', notesLabel: 'Notes', notesH: 'More about <em>each material.</em>', guide: 'Read the material guide' },
    quote: { title: 'Pricing', desc: 'Estimate your 3D printing cost in 10 seconds by size, material, infill, finish and quantity. See TVT partnership plans.', h1: 'Estimate your cost <em>in ten seconds.</em>', lead: 'Drag the sliders for an estimate. Your binding quote arrives within 2 business hours after an engineer reviews your file.', plansLabel: 'Partnership plans', plansH: 'Start with one piece, <em>grow with TVT.</em>', depends: 'Price depends on', dependsList: ['Actual plastic volume and internal infill', 'Material and layer height', 'Finish level: raw, sanded or hand painted', 'Quantity: 15% off from 10, 28% from 50, 40% from 200'], tiers: 'Volume discounts', tierRows: [['1 – 9', 'List price'], ['10 – 49', '−15%'], ['50 – 199', '−28%'], ['200+', '−40%']] },
    proc: { title: 'Process', desc: 'How to order 3D printing at TVT in 6 steps: send a file, quote, sample approval, production, QC and delivery.', h1: 'Six steps, <em>transparent end to end.</em>', lead: 'You always know where your order is. Every step has a committed time and photo updates on Zalo.', prep: 'What to prepare', prepList: ['A 3D file (STL, 3MF, OBJ, STEP) or reference photos', 'Target size in millimetres', 'Use: display, load-bearing, outdoors', 'Quantity and deadline'], guide: 'File preparation guide', times: 'Typical lead times', timeRows: [['Quote', 'Within 2 business hours'], ['3D design', '1 – 5 days'], ['Sample print', '24 – 72 hours'], ['Painting', '+1 – 3 days'], ['Shipping', '1 – 4 days']] },
    pol: { title: 'Policies', desc: 'TVT policies on privacy, returns, shipping, payment, cancellation, quality, terms and personal data.', h1: 'Clear terms <em>before you order.</em>', lead: 'Every TVT commitment on privacy, quality, delivery and payment.', descOf: (n, s) => `${n} at TVT 3D Print Atelier. ${s}` },
    faq: { title: 'FAQ', desc: 'Frequently asked questions about ordering 3D prints, Print on Demand, materials, quality, shipping and payment at TVT.', h1: 'Things <em>you often ask.</em>', lead: 'Can’t find your question? Message us on Zalo and an engineer will reply during business hours.' },
    learn: { title: 'Guides', desc: '3D printing guides: preparing files, choosing materials and the Print on Demand model.', h1: 'Understand 3D printing <em>to order it right.</em>', lead: 'Short guides to prepare your files, pick materials and start selling with POD.' },
    about: { title: 'About us', desc: 'TVT is an on-demand 3D printing studio combining precise printing with hand-finishing craft.', label: 'About TVT', h1: 'Where engineering <em>meets art.</em>', lead: 'TVT is an on-demand 3D printing studio. We pair precise printers with hand-finishing craft, so every piece is technically right and full of character.', facts: [['0.03 mm', 'Finest layer'], ['24/7', 'Print farm running'], ['12+', 'Materials in stock'], ['63', 'Provinces we ship to']], valLabel: 'Values', valH: 'Three things <em>TVT stands by.</em>', values: [['Precision', 'Every order is measured and photographed before shipping. Tolerances are committed in writing.'], ['Care', 'Engineers advise on materials for your use case, fix small file issues free and update you at every step.'], ['Privacy', 'Your files are used only for your order. We sign NDAs when needed and never reprint for anyone else.']], visitLabel: 'Studio', visitH: 'Visit <em>the TVT studio.</em>', visitLead: 'Book ahead to see the printers, material samples and talk with our engineers in person.', addr: 'Address', hours: 'Hours', hotline: 'Phone' },
    contact: { title: 'Contact', desc: 'Contact TVT for a 3D printing quote within 2 business hours. Send a file or describe your idea via Zalo or email.', h1: 'Have an idea? <em class="pearl">Give it form.</em>', lead: 'Write a few lines and the page builds a brief you can send via Zalo or email with your file. Quotes within 2 business hours.', info: 'Details', studio: 'Studio', hours: 'Hours', faqLabel: 'Before you send', faqH: 'Common <em>questions.</em>' },
    nf: { title: 'Page not found', desc: 'The page you are looking for does not exist.', label: 'Error 404', lead: 'This page hasn’t been printed yet. The link may have changed or no longer exists.', back: 'Back to home' },
    hours: '8:00 – 20:00, Monday – Saturday',
  },
};

/* ---------------- Tiện ích ---------------- */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>';
const CARET = '<svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M2 3.5l3 3 3-3"/></svg>';
const svcUrl = (s) => `dich-vu-${s.slug}.html`;
const solUrl = (s) => `giai-phap-${s.slug}.html`;
const polUrl = (p) => `chinh-sach-${p.slug}.html`;
const artUrl = (a) => `kien-thuc-${a.slug}.html`;
const roman = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'];
const fmtDate = (d, lang) => (lang === 'vi' ? d.split('-').reverse().join('/') : new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }));

function buildLang(lang) {
  const D = lang === 'vi' ? vi : en;
  const T = UI[lang];
  const C = P[lang];
  const A = lang === 'vi' ? 'assets/' : '../assets/';
  const img = (k) => `${A}img/${k}.png`;
  const ph = (v, label) => (v ? esc(v) : `<span class="ph">${label}</span>`);
  const fill = (s) => esc(s).replace('{freeShipFrom}', site.freeShipFrom ? esc(site.freeShipFrom) : `<span class="ph">${T.phFree}</span>`);
  const other = lang === 'vi' ? 'en' : 'vi';
  const switchHref = (file) => (lang === 'vi' ? `en/${file}` : `../${file}`);
  const pageUrl = (l, file) => `${site.url}/${l === 'en' ? 'en/' : ''}${file === 'index.html' ? '' : file}`;

  /* ---------- Layout ---------- */
  function header(cur, file) {
    const ddSvc = D.services.map((s) => `<li><a href="${svcUrl(s)}">${esc(s.name)}<small>${esc(s.code)}</small></a></li>`).join('');
    const ddSol = D.solutions.map((s) => `<li><a href="${solUrl(s)}">${esc(s.name)}<small>${esc(s.title)}</small></a></li>`).join('');
    const a = (href, label, key) => `<li><a href="${href}"${cur === key ? ' aria-current="page"' : ''}>${label}</a></li>`;
    return `<a class="skip" href="#main">${T.skip}</a>
<header class="top">
  <div class="wrap nav">
    <a class="brand" href="index.html" aria-label="${T.homeAria}"><b>TVT</b><small>${esc(site.tagline)}</small></a>
    <ul class="menu" id="menu">
      <li><button type="button" class="dd-btn${cur === 'dich-vu' ? ' cur' : ''}" aria-expanded="false">${T.nav.svc} ${CARET}</button><ul class="dd">${ddSvc}<li><a class="all" href="dich-vu.html">${T.allSvc}</a></li></ul></li>
      <li><button type="button" class="dd-btn${cur === 'giai-phap' ? ' cur' : ''}" aria-expanded="false">${T.nav.sol} ${CARET}</button><ul class="dd">${ddSol}<li><a class="all" href="giai-phap.html">${T.allSol}</a></li></ul></li>
      ${a('tac-pham.html', T.nav.work, 'tac-pham')}
      ${a('vat-lieu.html', T.nav.mat, 'vat-lieu')}
      ${a('bao-gia.html', T.nav.quote, 'bao-gia')}
      ${a('kien-thuc.html', T.nav.learn, 'kien-thuc')}
      ${a('ve-chung-toi.html', T.nav.about, 've-chung-toi')}
      ${a('lien-he.html', T.nav.contact, 'lien-he')}
      <li class="lang-li"><a class="lang" href="${switchHref(file)}" hreflang="${other}" lang="${other}">${T.langName}</a></li>
    </ul>
    <div class="nav-cta">
      <a class="lang-pill" href="${switchHref(file)}" hreflang="${other}" lang="${other}" aria-label="${T.langAria}">${T.langShort}</a>
      <a class="btn solid cta-top" href="lien-he.html">${T.sendFile}</a>
      <button type="button" class="menu-btn" id="menuBtn" aria-label="${T.openMenu}" aria-expanded="false" aria-controls="menu"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg></button>
    </div>
  </div>
</header>`;
  }

  function footer() {
    const social = [['Facebook', site.facebook], ['TikTok', site.tiktok], ['Instagram', site.instagram]].filter((x) => x[1]);
    return `<footer class="site">
  <div class="wrap">
    <div class="foot">
      <div><div class="big">TVT</div><p>${T.footBlurb}</p>
        <p>${T.hotline}: ${ph(site.phone, T.phPhone)}<br>${T.email}: ${ph(site.email, T.phEmail)}</p></div>
      <div><h4>${T.nav.svc}</h4><ul>${D.services.map((s) => `<li><a href="${svcUrl(s)}">${esc(s.name)}</a></li>`).join('')}</ul></div>
      <div><h4>${T.nav.sol}</h4><ul>${D.solutions.map((s) => `<li><a href="${solUrl(s)}">${esc(s.name)}</a></li>`).join('')}</ul></div>
      <div><h4>${T.footPol}</h4><ul>${D.policies.map((p) => `<li><a href="${polUrl(p)}">${esc(p.name)}</a></li>`).join('')}</ul></div>
      <div><h4>TVT</h4><ul><li><a href="ve-chung-toi.html">${T.footAbout}</a></li><li><a href="quy-trinh.html">${T.process}</a></li><li><a href="tac-pham.html">${T.nav.work}</a></li><li><a href="vat-lieu.html">${T.nav.mat}</a></li><li><a href="bao-gia.html">${T.nav.quote}</a></li><li><a href="kien-thuc.html">${T.nav.learn}</a></li><li><a href="faq.html">${T.faq}</a></li><li><a href="lien-he.html">${T.nav.contact}</a></li>${social.map((x) => `<li><a href="${esc(x[1])}" rel="noopener" target="_blank">${x[0]}</a></li>`).join('')}</ul></div>
    </div>
    <div class="legal"><span>© ${YEAR} TVT 3D Print Atelier</span><span class="mono">G28 · M104 S215 · ready</span></div>
  </div>
</footer>`;
  }

  function layout({ file, title, desc, cur, body, extraScripts = '', ogImg = 'hero', jsonld }) {
    const full = file === 'index.html' ? T.titleHome : `${title} · ${T.titleSuffix}`;
    const ld = jsonld || { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'TVT 3D Print Atelier', url: site.url, description: T.bizDesc, ...(site.phone ? { telephone: site.phone } : {}), ...(site.email ? { email: site.email } : {}), ...(site.address ? { address: site.address } : {}) };
    const alt = file === '404.html' ? '' : `<link rel="alternate" hreflang="vi" href="${esc(pageUrl('vi', file))}">\n<link rel="alternate" hreflang="en" href="${esc(pageUrl('en', file))}">\n<link rel="alternate" hreflang="x-default" href="${esc(pageUrl('vi', file))}">\n`;
    return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(full)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${esc(pageUrl(lang, file))}">
${alt}<meta property="og:type" content="website">
<meta property="og:site_name" content="TVT 3D Print Atelier">
<meta property="og:locale" content="${T.locale}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(pageUrl(lang, file))}">
<meta property="og:image" content="${esc(site.url)}/assets/img/${ogImg}.png">
<meta name="theme-color" content="#0D0E12">
<link rel="icon" href="${A}favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Be+Vietnam+Pro:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="${A}style.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script>window.TVT_I18N=${JSON.stringify(T.js)};</script>
</head>
<body>
${header(cur, file)}
<main id="main">
${body}
</main>
${footer()}
<script src="${A}main.js" defer></script>
${extraScripts}
</body>
</html>
`;
  }

  const crumb = (items) => `<ol class="crumb"><li><a href="index.html">${T.home}</a></li>${items.map(([l, h]) => (h ? `<li><a href="${h}">${esc(l)}</a></li>` : `<li aria-current="page">${esc(l)}</li>`)).join('')}</ol>`;
  const pageHero = ({ crumbs, label, h1, lead, visual, actions }) => `<section class="page-hero${visual ? '' : ' text-only'}"><div class="wrap">${crumb(crumbs)}
  <div class="grid" style="margin-top:28px">
    <div><p class="label">${esc(label)}</p><h1>${h1}</h1>${lead ? `<p class="lead">${esc(lead)}</p>` : ''}${actions ? `<div class="actions">${actions}</div>` : ''}</div>
    ${visual ? `<div class="visual"><img src="${img(visual)}" alt="" width="720" height="720"></div>` : ''}
  </div></div></section>`;
  const secHead = (label, h2, lead) => `<div class="sec-head"><p class="label">${esc(label)}</p><div class="txt"><h2>${h2}</h2>${lead ? `<p class="lead">${esc(lead)}</p>` : ''}</div></div>`;

  /* ---------- Khối dùng chung ---------- */
  const dots = (v) => `<span class="dots" role="img" aria-label="${v} ${T.of5}">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= v ? 'on' : ''}"></i>`).join('')}</span>`;
  const matTable = () => `<div class="tbl-wrap"><table><thead><tr>${T.matCols.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>${D.materials.map((m) => `<tr><td class="mat">${esc(m.n)}<small>${esc(m.t)}</small></td><td>${dots(m.d)}</td><td>${dots(m.b)}</td><td class="mono">${m.h}</td><td>${esc(m.u)}</td></tr>`).join('')}</tbody></table></div>`;
  const svcRows = () => `<div class="svc-list">${D.services.filter((s) => s.slug !== 'print-on-demand').map((s) => `<a class="svc" href="${svcUrl(s)}"><span class="code">${esc(s.code)}</span><h3>${esc(s.name)}</h3><p>${esc(s.short)}</p><ul>${s.specs.slice(0, 2).map((x) => `<li>${esc(x[0])}: ${esc(x[1])}</li>`).join('')}</ul><span class="arr">${ARR}</span></a>`).join('')}</div>`;
  const podBlock = () => `<div class="pod">
  <div><p class="label" style="color:var(--molten)">${T.podLabel}</p><h3 style="margin-top:14px">${T.podTitle}</h3>
    <p class="lead">${T.podLead}</p>
    <div class="tags">${T.podTags.map((x) => `<span>${x}</span>`).join('')}</div>
    <p style="margin-top:28px"><a class="btn" href="dich-vu-print-on-demand.html">${T.podMore} ${ARR}</a></p></div>
  <div class="flow" aria-label="${T.podFlowAria}">${T.podFlow.map((f) => `<div><span class="k">${f[0]}</span><b>${f[1]}</b><i>${f[2]}</i></div>`).join('')}</div></div>`;
  const stepsGrid = () => `<div class="steps">${D.steps.map((s, i) => `<div class="step"><span class="n">${roman[i]}.</span><h3>${esc(s[0])}</h3><p>${esc(s[1])}</p><span class="t">${esc(s[2])}</span></div>`).join('')}</div>`;
  const galGrid = (items, bigFirst = 2) => `<div class="gal" id="gal">${items.map((g, i) => `<figure class="work${i < bigFirst ? ' big' : ''}" data-cat="${g.cat}"><img src="${img(g.img)}" alt="${esc(g.title)}" loading="lazy" width="720" height="720"><figcaption class="cap"><b>${esc(g.title)}</b><span>${esc(g.meta)}</span></figcaption></figure>`).join('')}</div>`;
  const quoteBlock = () => `<div class="quote">
  <form class="q-form" id="qForm" onsubmit="return false">
    <div class="field"><label for="qSize">${T.q.size} <output id="qSizeOut" for="qSize">10 cm</output></label><input type="range" id="qSize" min="2" max="35" value="10"></div>
    <div class="field"><label for="qMat">${T.q.mat}</label><select id="qMat">${D.materials.map((m) => `<option data-rate="${m.rate}" data-type="${esc(m.t)}">${esc(m.n)}</option>`).join('')}</select></div>
    <div class="field"><span class="lbl">${T.q.fill}</span><div class="seg" role="radiogroup" aria-label="${T.q.fill}">
      <input type="radio" name="qFill" id="fa" value="0.08"><label for="fa">${T.q.fills[0]}</label>
      <input type="radio" name="qFill" id="fb" value="0.14" checked><label for="fb">${T.q.fills[1]}</label>
      <input type="radio" name="qFill" id="fc" value="0.24"><label for="fc">${T.q.fills[2]}</label></div></div>
    <div class="field"><span class="lbl">${T.q.fin}</span><div class="seg" role="radiogroup" aria-label="${T.q.fin}">
      <input type="radio" name="qFin" id="ha" value="1" checked><label for="ha">${T.q.fins[0]}</label>
      <input type="radio" name="qFin" id="hb" value="1.35"><label for="hb">${T.q.fins[1]}</label>
      <input type="radio" name="qFin" id="hc" value="2.1"><label for="hc">${T.q.fins[2]}</label></div></div>
    <div class="field"><label for="qQty">${T.q.qty} <output id="qQtyOut" for="qQty">1</output></label><input type="range" id="qQty" min="0" max="100" value="0"></div>
  </form>
  <div class="q-out" aria-live="polite">
    <div><p class="label">${T.q.price}</p><div class="q-price" id="qPrice">—</div></div>
    <div class="q-break" id="qBreak"></div>
    <p class="q-note">${T.q.note}</p>
    <a class="btn solid" href="lien-he.html" style="justify-self:start">${T.q.cta} ${ARR}</a>
  </div></div>`;
  const plansBlock = () => `<div class="plans">${D.plans.map((p) => `<div class="plan${p.hot ? ' hot' : ''}"><span class="label">${esc(p.who)}</span><h3>${esc(p.name)}</h3><p class="price">${esc(p.price)}<small>${esc(p.sub)}</small></p><ul>${p.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul><a class="btn${p.hot ? ' solid' : ''}" href="lien-he.html">${esc(p.cta)}</a></div>`).join('')}</div>`;
  const ctaBand = (h2 = T.ctaH) => `<section class="band"><div class="wrap cta-band"><div><p class="label">${T.ctaLabel}</p><h2 style="margin-top:18px">${h2}</h2></div><div class="actions"><a class="btn solid" href="lien-he.html">${T.sendFile} ${ARR}</a><a class="btn" href="bao-gia.html">${T.ctaQuote}</a></div></div></section>`;
  const card = (href, image, title, text, more = T.more) => `<a class="card" href="${href}"><div class="img"><img src="${img(image)}" alt="" loading="lazy" width="720" height="720"></div><div class="body"><h3>${esc(title)}</h3><p>${esc(text)}</p><span class="more">${more} →</span></div></a>`;
  const cards = (arr) => `<div class="cards n${arr.length}">${arr.join('')}</div>`;
  const faqAcc = (items) => `<div class="acc">${items.map(([q, a]) => `<details><summary>${esc(q)}<span class="plus"></span></summary><p>${esc(a)}</p></details>`).join('')}</div>`;
  const facts = (list, style = '') => `<div class="facts"${style}>${list.map((f) => `<div><strong>${f[0]}</strong><span>${f[1]}</span></div>`).join('')}</div>`;

  /* ---------- Các trang ---------- */
  const pages = [];
  const add = (file, opts) => pages.push({ file, ...opts });
  const H = C.home;

  add('index.html', {
    title: T.home, cur: 'home', desc: H.desc,
    extraScripts: `<script src="${THREE_URL}" defer></script>\n<script src="${A}hero3d.js" defer></script>`,
    body: `<section class="hero"><div class="wrap">
  <div class="hero-grid">
    <div><p class="label">${H.label}</p><h1>${H.h1}</h1><p class="lead">${H.lead}</p>
      <div class="hero-ctas"><a class="btn solid" href="bao-gia.html">${H.cta1} ${ARR}</a><a class="btn" href="tac-pham.html">${H.cta2}</a></div></div>
    <div class="stage" aria-label="${T.stageAria}">
      <img class="poster" src="${img('hero')}" alt="" width="720" height="720">
      <canvas id="hero3d"></canvas>
      <div class="readout"><span>${T.layer} <b id="rLayer">150/150</b></span><span>Z <b id="rZ">24.00</b> mm</span><span>${T.readoutMat}</span></div>
    </div>
  </div>
  ${facts(T.facts)}
</div></section>
<section class="band tight"><div class="wrap">${secHead(T.nav.svc, H.svcH)}${podBlock()}<div style="margin-top:clamp(64px,8vw,100px)">${svcRows()}</div></div></section>
<section class="band light"><div class="wrap">
  ${secHead(T.nav.sol, H.solH)}
  <div class="sol-tabs" role="tablist" aria-label="${H.solAria}" id="solTabs">${D.solutions.map((s) => `<button type="button" role="tab" id="t-${s.slug}" aria-controls="p-${s.slug}">${esc(s.name)}</button>`).join('')}</div>
  ${D.solutions.map((s, i) => `<div class="sol-panel" role="tabpanel" id="p-${s.slug}" aria-labelledby="t-${s.slug}" tabindex="0"${i ? ' hidden' : ''}><div><h3>${esc(s.title)}</h3><p class="lead">${esc(s.desc)}</p><ul class="bullets">${s.points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div><aside class="sol-side"><div class="big-stat"><strong>${esc(s.stat[0])}</strong><span>${esc(s.stat[1])}</span></div><div style="display:grid;gap:12px"><p class="label">${H.solProducts}</p><div class="chips">${s.products.map((x) => `<span>${esc(x)}</span>`).join('')}</div></div><a class="btn solid" href="${solUrl(s)}" style="justify-self:start">${H.solMore} ${ARR}</a></aside></div>`).join('')}
</div></section>
<section class="band light alt"><div class="wrap">${secHead(T.process, H.procH)}${stepsGrid()}<p style="margin-top:32px"><a class="link" href="quy-trinh.html">${H.procMore}</a></p></div></section>
<section class="band"><div class="wrap">${secHead(T.nav.work, H.workH)}${galGrid(D.gallery.slice(0, 5))}<p style="margin-top:32px"><a class="btn" href="tac-pham.html">${H.workMore} ${ARR}</a></p></div></section>
<section class="band light"><div class="wrap">${secHead(T.nav.mat, H.matH, H.matLead)}${matTable()}</div></section>
<section class="band"><div class="wrap">${secHead(T.nav.quote, H.quoteH)}${quoteBlock()}</div></section>
<section class="band light"><div class="wrap">${secHead(T.faq, H.faqH)}${faqAcc(D.faq.flatMap((g) => g[1]).slice(0, 5))}<p style="margin-top:32px"><a class="link" href="faq.html">${H.faqMore}</a></p></div></section>
${ctaBand()}`,
  });

  const S = C.svc;
  add('dich-vu.html', {
    title: S.title, cur: 'dich-vu', desc: S.desc,
    body: `${pageHero({ crumbs: [[S.title]], label: S.title, h1: S.h1, lead: S.lead, visual: 'gear' })}
<section class="band tight"><div class="wrap">${podBlock()}</div></section>
<section class="band light"><div class="wrap">${secHead(S.allLabel, S.allH)}${cards(D.services.map((s) => card(svcUrl(s), s.img, s.name, s.short)))}</div></section>
${ctaBand()}`,
  });
  for (const s of D.services) {
    const rel = D.solutions.filter((x) => x.services.includes(s.slug));
    add(svcUrl(s), {
      title: s.name, cur: 'dich-vu', desc: s.short, ogImg: s.img,
      jsonld: { '@context': 'https://schema.org', '@type': 'Service', name: s.name, description: s.intro, provider: { '@type': 'LocalBusiness', name: 'TVT 3D Print Atelier', url: site.url }, areaServed: 'VN' },
      body: `${pageHero({ crumbs: [[S.title, 'dich-vu.html'], [s.name]], label: s.code, h1: esc(s.name), lead: s.intro, visual: s.img, actions: `<a class="btn solid" href="lien-he.html?dich-vu=${encodeURIComponent(s.slug)}">${S.quote} ${ARR}</a><a class="btn" href="bao-gia.html">${S.est}</a>` })}
<section class="band light"><div class="wrap">${secHead(S.featLabel, S.featH(esc(s.name)))}<div class="feat">${s.features.map((f) => `<div><h3>${esc(f[0])}</h3><p>${esc(f[1])}</p></div>`).join('')}</div></div></section>
<section class="band light alt"><div class="wrap two">
  <div><p class="label">${S.specs}</p><dl class="specs" style="margin-top:20px">${s.specs.map((x) => `<div><dt>${esc(x[0])}</dt><dd>${esc(x[1])}</dd></div>`).join('')}</dl></div>
  <div><p class="label">${S.uses}</p><ul class="bullets" style="margin-top:20px">${s.uses.map((u) => `<li>${esc(u)}</li>`).join('')}</ul></div>
</div></section>
<section class="band light"><div class="wrap">${secHead(T.process, S.procH)}${stepsGrid()}</div></section>
${rel.length ? `<section class="band"><div class="wrap">${secHead(S.relLabel, S.relH)}${cards(rel.map((r) => card(solUrl(r), r.img, r.name, r.title)))}</div></section>` : ''}
<section class="band light alt"><div class="wrap">${secHead(S.otherLabel, S.otherH)}${cards(D.services.filter((x) => x !== s).slice(0, 3).map((x) => card(svcUrl(x), x.img, x.name, x.short)))}</div></section>
${ctaBand()}`,
    });
  }

  const SO = C.sol;
  add('giai-phap.html', {
    title: SO.title, cur: 'giai-phap', desc: SO.desc,
    body: `${pageHero({ crumbs: [[SO.title]], label: SO.title, h1: SO.h1, lead: SO.lead, visual: 'vase2' })}
<section class="band light"><div class="wrap">${cards(D.solutions.map((s) => card(solUrl(s), s.img, s.name, s.title)))}</div></section>
${ctaBand()}`,
  });
  for (const s of D.solutions) {
    const svcs = D.services.filter((x) => s.services.includes(x.slug));
    add(solUrl(s), {
      title: s.name, cur: 'giai-phap', desc: `${s.title}. ${s.desc}`, ogImg: s.img,
      body: `${pageHero({ crumbs: [[SO.title, 'giai-phap.html'], [s.name]], label: s.name, h1: esc(s.title), lead: s.desc, visual: s.img, actions: `<a class="btn solid" href="lien-he.html">${SO.consult} ${ARR}</a>` })}
<section class="band light"><div class="wrap two">
  <div><p class="label">${SO.pain}</p><ul class="bullets x" style="margin-top:20px">${s.pain.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
  <div><p class="label">${SO.fix}</p><ul class="bullets" style="margin-top:20px">${s.points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
</div></section>
<section class="band light alt"><div class="wrap two">
  <div class="big-stat"><strong>${esc(s.stat[0])}</strong><span>${esc(s.stat[1])}</span></div>
  <div style="display:grid;gap:14px"><p class="label">${SO.products}</p><div class="chips">${s.products.map((x) => `<span>${esc(x)}</span>`).join('')}</div></div>
</div></section>
<section class="band"><div class="wrap">${secHead(SO.svcLabel, SO.svcH)}${cards(svcs.map((x) => card(svcUrl(x), x.img, x.name, x.short)))}</div></section>
${s.slug === 'seller-tmdt' ? `<section class="band light"><div class="wrap">${secHead(SO.plansLabel, SO.plansH)}${plansBlock()}</div></section>` : ''}
${ctaBand()}`,
    });
  }

  const W = C.work;
  add('tac-pham.html', {
    title: W.title, cur: 'tac-pham', desc: W.desc,
    body: `${pageHero({ crumbs: [[W.title]], label: W.title, h1: W.h1, lead: W.lead })}
<section class="band tight"><div class="wrap">
  <div class="filters" id="filters" role="group" aria-label="${T.filterAria}">${D.galleryCats.map(([k, l], i) => `<button type="button" data-cat="${k}" aria-pressed="${i === 0}">${l}</button>`).join('')}</div>
  ${galGrid(D.gallery, 2)}
  <p class="gal-note">${T.galNote}</p>
</div></section>
${ctaBand(W.cta)}`,
  });

  const M = C.mat;
  add('vat-lieu.html', {
    title: M.title, cur: 'vat-lieu', desc: M.desc,
    body: `${pageHero({ crumbs: [[M.title]], label: M.title, h1: M.h1, lead: M.lead, visual: 'knot' })}
<section class="band light"><div class="wrap">${matTable()}</div></section>
<section class="band light alt"><div class="wrap">${secHead(M.notesLabel, M.notesH)}<div class="mat-notes">${D.materials.map((m) => `<div><b>${esc(m.n)}</b><p>${esc(m.note)}</p></div>`).join('')}</div>
<p style="margin-top:32px"><a class="link" href="${artUrl(D.articles[1])}">${M.guide}</a></p></div></section>
${ctaBand()}`,
  });

  const Q = C.quote;
  add('bao-gia.html', {
    title: Q.title, cur: 'bao-gia', desc: Q.desc,
    body: `${pageHero({ crumbs: [[Q.title]], label: Q.title, h1: Q.h1, lead: Q.lead })}
<section class="band tight"><div class="wrap">${quoteBlock()}</div></section>
<section class="band light"><div class="wrap">${secHead(Q.plansLabel, Q.plansH)}${plansBlock()}</div></section>
<section class="band light alt"><div class="wrap two">
  <div><p class="label">${Q.depends}</p><ul class="bullets" style="margin-top:20px">${Q.dependsList.map((x) => `<li>${x}</li>`).join('')}</ul></div>
  <div><p class="label">${Q.tiers}</p><dl class="specs" style="margin-top:20px">${Q.tierRows.map((r) => `<div><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join('')}</dl></div>
</div></section>
${ctaBand()}`,
  });

  const PR = C.proc;
  add('quy-trinh.html', {
    title: PR.title, cur: '', desc: PR.desc,
    body: `${pageHero({ crumbs: [[PR.title]], label: PR.title, h1: PR.h1, lead: PR.lead })}
<section class="band light"><div class="wrap">${stepsGrid()}</div></section>
<section class="band light alt"><div class="wrap two">
  <div><p class="label">${PR.prep}</p><ul class="bullets" style="margin-top:20px">${PR.prepList.map((x) => `<li>${x}</li>`).join('')}</ul><p style="margin-top:24px"><a class="link" href="${artUrl(D.articles[0])}">${PR.guide}</a></p></div>
  <div><p class="label">${PR.times}</p><dl class="specs" style="margin-top:20px">${PR.timeRows.map((r) => `<div><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join('')}</dl></div>
</div></section>
${ctaBand()}`,
  });

  const PO = C.pol;
  add('chinh-sach.html', {
    title: PO.title, cur: '', desc: PO.desc,
    body: `${pageHero({ crumbs: [[PO.title]], label: PO.title, h1: PO.h1, lead: PO.lead })}
<section class="band light"><div class="wrap"><div class="pol-list">${D.policies.map((p) => `<a href="${polUrl(p)}"><span><b>${esc(p.name)}</b><small>${esc(p.short)}</small></span>${ARR}</a>`).join('')}</div></div></section>
${ctaBand()}`,
  });
  for (const p of D.policies) {
    add(polUrl(p), {
      title: p.name, cur: '', desc: PO.descOf(p.name, p.short),
      body: `${pageHero({ crumbs: [[PO.title, 'chinh-sach.html'], [p.name]], label: PO.title, h1: esc(p.name), lead: p.short })}
<section class="band light"><div class="wrap doc">
  <nav class="toc" aria-label="${T.polNav}"><p class="label">${T.polNav}</p>${D.policies.map((x) => `<a href="${polUrl(x)}"${x === p ? ' aria-current="page"' : ''}>${esc(x.name)}</a>`).join('')}</nav>
  <article class="prose"><p class="meta">${T.updated}: ${lang === 'vi' ? '01/11/' + YEAR : '1 Nov ' + YEAR}</p>${p.body.map(([h, items]) => `<section><h2>${esc(h)}</h2>${items.length > 1 ? `<ul>${items.map((i) => `<li>${fill(i)}</li>`).join('')}</ul>` : `<p>${fill(items[0])}</p>`}</section>`).join('')}
  <section><h2>${T.contactH}</h2><p>${T.polContact(ph(site.phone, T.phPhone), ph(site.email, T.phEmail))}</p></section></article>
</div></section>`,
    });
  }

  const F = C.faq;
  add('faq.html', {
    title: F.title, cur: '', desc: F.desc,
    jsonld: { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: D.faq.flatMap((g) => g[1]).map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    body: `${pageHero({ crumbs: [[F.title]], label: F.title, h1: F.h1, lead: F.lead })}
<section class="band light"><div class="wrap faq-groups">${D.faq.map(([g, items]) => `<div class="faq-group"><p class="label">${esc(g)}</p>${faqAcc(items)}</div>`).join('')}</div></section>
${ctaBand()}`,
  });

  const L = C.learn;
  add('kien-thuc.html', {
    title: L.title, cur: 'kien-thuc', desc: L.desc,
    body: `${pageHero({ crumbs: [[L.title]], label: L.title, h1: L.h1, lead: L.lead })}
<section class="band light"><div class="wrap"><div class="posts">${D.articles.map((a) => card(artUrl(a), a.img, a.title, a.excerpt, `${fmtDate(a.date, lang)} · ${a.read}`)).join('')}</div></div></section>
${ctaBand()}`,
  });
  for (const a of D.articles) {
    add(artUrl(a), {
      title: a.title, cur: 'kien-thuc', desc: a.excerpt, ogImg: a.img,
      jsonld: { '@context': 'https://schema.org', '@type': 'Article', headline: a.title, datePublished: a.date, inLanguage: lang, author: { '@type': 'Organization', name: 'TVT 3D Print Atelier' } },
      body: `${pageHero({ crumbs: [[L.title, 'kien-thuc.html'], [a.title]], label: `${fmtDate(a.date, lang)} · ${a.read} ${T.readSuffix}`, h1: esc(a.title), lead: a.excerpt, visual: a.img })}
<section class="band light"><div class="wrap doc">
  <nav class="toc" aria-label="${T.artNav}"><p class="label">${T.postsLabel}</p>${D.articles.map((x) => `<a href="${artUrl(x)}"${x === a ? ' aria-current="page"' : ''}>${esc(x.title)}</a>`).join('')}</nav>
  <article class="prose">${a.body.map(([h, items]) => `<section><h2>${esc(h)}</h2>${items.length > 1 ? `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` : `<p>${esc(items[0])}</p>`}</section>`).join('')}</article>
</div></section>
${ctaBand()}`,
    });
  }

  const AB = C.about;
  add('ve-chung-toi.html', {
    title: AB.title, cur: 've-chung-toi', desc: AB.desc,
    body: `${pageHero({ crumbs: [[AB.title]], label: AB.label, h1: AB.h1, lead: AB.lead, visual: 'armillary' })}
<section class="band light"><div class="wrap">${facts(AB.facts, ' style="margin-top:0"')}</div></section>
<section class="band light alt"><div class="wrap">${secHead(AB.valLabel, AB.valH)}<div class="values">${AB.values.map((v) => `<div><h3>${v[0]}</h3><p>${v[1]}</p></div>`).join('')}</div></div></section>
<section class="band"><div class="wrap two">
  <div><p class="label">${AB.visitLabel}</p><h2 style="margin-top:18px">${AB.visitH}</h2><p class="lead" style="margin-top:20px">${AB.visitLead}</p></div>
  <dl class="c-list" style="margin-top:0"><div><dt>${AB.addr}</dt><dd>${ph(site.address, T.phAddr)}</dd></div><div><dt>${AB.hours}</dt><dd>${esc(C.hours)}</dd></div><div><dt>${AB.hotline}</dt><dd>${ph(site.phone, T.phPhone)}</dd></div></dl>
</div></section>
${ctaBand()}`,
  });

  const CT = C.contact, FM = T.form;
  const svcOptions = D.services.map((s) => `<option value="${s.slug}">${esc(s.name)}</option>`).join('') + FM.extra.map((x) => `<option>${x}</option>`).join('');
  const zaloLink = site.zalo ? `<a class="btn" id="bZalo" href="https://zalo.me/${esc(site.zalo)}" target="_blank" rel="noopener">${FM.zalo}</a>` : '';
  add('lien-he.html', {
    title: CT.title, cur: 'lien-he', desc: CT.desc,
    body: `${pageHero({ crumbs: [[CT.title]], label: CT.title, h1: CT.h1, lead: CT.lead })}
<section class="band tight"><div class="wrap contact">
  <div><p class="label">${CT.info}</p>
    <dl class="c-list"><div><dt>${T.hotline}</dt><dd>${ph(site.phone, T.phPhone)}</dd></div><div><dt>${T.email}</dt><dd>${ph(site.email, T.phEmail2)}</dd></div><div><dt>${CT.studio}</dt><dd>${ph(site.address, T.phAddr)}</dd></div><div><dt>${CT.hours}</dt><dd>${esc(C.hours)}</dd></div></dl></div>
  <form class="brief" id="brief" novalidate data-email="${esc(site.email)}">
    <div class="row"><label for="bName">${FM.name}<input type="text" id="bName" autocomplete="name" placeholder="${FM.namePh}"></label><label for="bPhone">${FM.phone}<input type="tel" id="bPhone" autocomplete="tel" placeholder="${FM.phonePh}"></label></div>
    <div class="row"><label for="bSvc">${FM.svc}<select id="bSvc">${svcOptions}</select></label><label for="bQty">${FM.qty}<input type="number" id="bQty" min="1" value="1"></label></div>
    <label for="bDesc">${FM.desc}<textarea id="bDesc" placeholder="${FM.descPh}"></textarea></label>
    <p id="bErr" class="err" role="alert" hidden>${FM.err}</p>
    <button class="btn solid" type="submit" id="bSubmit">${FM.submit} ${ARR}<span class="spin" aria-hidden="true"></span></button>
    <div class="brief-out" id="bOut" hidden><b style="font-weight:500">${FM.ready}</b><pre id="bText"></pre>
      <div class="acts"><button class="btn" type="button" id="bCopy">${FM.copy}</button>${zaloLink}${site.email ? `<a class="btn" id="bMail" href="#">${FM.mail}</a>` : ''}</div></div>
  </form>
</div></section>
<section class="band light"><div class="wrap">${secHead(CT.faqLabel, CT.faqH)}${faqAcc(D.faq[0][1])}</div></section>`,
  });

  const NF = C.nf;
  add('404.html', {
    title: NF.title, cur: '', desc: NF.desc,
    body: `<section class="wrap nf"><p class="label">${NF.label}</p><h1><em class="pearl">404</em></h1><p class="lead">${NF.lead}</p><p><a class="btn solid" href="index.html">${NF.back} ${ARR}</a></p></section>`,
  });

  return pages.map((p) => ({ ...p, html: layout(p) }));
}

/* ---------------- Ghi file ---------------- */
const EN_DIR = join(OUT, 'en');
if (!existsSync(EN_DIR)) mkdirSync(EN_DIR);
for (const d of [OUT, EN_DIR]) for (const f of readdirSync(d)) if (f.endsWith('.html')) unlinkSync(join(d, f));
const out = { vi: buildLang('vi'), en: buildLang('en') };
for (const p of out.vi) writeFileSync(join(OUT, p.file), p.html);
for (const p of out.en) writeFileSync(join(EN_DIR, p.file), p.html);
const urls = [];
for (const p of out.vi) if (p.file !== '404.html') {
  const f = p.file === 'index.html' ? '' : p.file;
  urls.push(`  <url><loc>${site.url}/${f}</loc><xhtml:link rel="alternate" hreflang="vi" href="${site.url}/${f}"/><xhtml:link rel="alternate" hreflang="en" href="${site.url}/en/${f}"/></url>`);
  urls.push(`  <url><loc>${site.url}/en/${f}</loc><xhtml:link rel="alternate" hreflang="vi" href="${site.url}/${f}"/><xhtml:link rel="alternate" hreflang="en" href="${site.url}/en/${f}"/></url>`);
}
writeFileSync(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
console.log(`Đã sinh ${out.vi.length} trang tiếng Việt + ${out.en.length} trang tiếng Anh vào public/`);
