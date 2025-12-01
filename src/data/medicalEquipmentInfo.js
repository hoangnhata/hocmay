// Thông tin chi tiết về các vật tư y tế
export const medicalEquipmentInfo = {
  "medical tape": {
    name_vi: "băng keo y tế",
    name_en: "medical tape",
    usage: [
      "Dùng để cố định băng gạc, ống truyền dịch",
      "Dán băng vết thương để giữ vệ sinh",
      "Cố định các thiết bị y tế trên da",
    ],
    storage: [
      "Bảo quản nơi khô ráo, thoáng mát",
      "Tránh ánh sáng trực tiếp và nhiệt độ cao",
      "Để xa tầm tay trẻ em",
    ],
    expiry: "Thường không có hạn sử dụng cụ thể, nhưng nên kiểm tra độ dính trước khi sử dụng",
    notes: [
      "Không dùng trên vết thương hở nếu da bị dị ứng",
      "Thay băng keo khi bị ướt hoặc bẩn",
      "Kiểm tra độ dính trước khi sử dụng",
    ],
  },
  "medical tweezers": {
    name_vi: "nhíp y tế",
    name_en: "medical tweezers",
    usage: [
      "Dùng để gắp các vật nhỏ, mảnh vụn ra khỏi vết thương",
      "Hỗ trợ trong các thủ thuật y tế nhỏ",
      "Gắp bông gòn, gạc khi chăm sóc vết thương",
    ],
    storage: [
      "Rửa sạch và lau khô sau mỗi lần sử dụng",
      "Bảo quản trong hộp kín, khô ráo",
      "Khử trùng bằng cồn 70 độ trước khi sử dụng",
    ],
    expiry: "Không có hạn sử dụng, nhưng cần kiểm tra định kỳ độ sắc và độ bền",
    notes: [
      "Luôn khử trùng trước và sau khi sử dụng",
      "Không dùng nhíp bị gỉ hoặc mất độ sắc",
      "Tránh để rơi hoặc va đập làm biến dạng",
    ],
  },
  "medicine cup": {
    name_vi: "cốc y tế",
    name_en: "medicine cup",
    usage: [
      "Đong đo lượng thuốc lỏng chính xác",
      "Pha thuốc bột với nước",
      "Cho bệnh nhân uống thuốc dạng lỏng",
    ],
    storage: [
      "Rửa sạch và để khô sau mỗi lần sử dụng",
      "Bảo quản nơi khô ráo, sạch sẽ",
      "Tránh tiếp xúc với hóa chất",
    ],
    expiry: "Không có hạn sử dụng, nhưng nên thay mới khi bị nứt, vỡ",
    notes: [
      "Luôn rửa sạch trước và sau khi sử dụng",
      "Kiểm tra vạch đo chính xác trước khi đong thuốc",
      "Không dùng cốc bị nứt hoặc vỡ",
    ],
  },
  "mercury thermometer": {
    name_vi: "nhiệt kế thủy ngân",
    name_en: "mercury thermometer",
    usage: [
      "Đo nhiệt độ cơ thể qua miệng, nách hoặc hậu môn",
      "Lắc mạnh để đưa thủy ngân xuống dưới 35°C trước khi đo",
      "Giữ trong miệng/nách ít nhất 3-5 phút",
    ],
    storage: [
      "Bảo quản trong hộp bảo vệ, tránh va đập",
      "Để nơi khô ráo, tránh ánh sáng trực tiếp",
      "Không để gần nguồn nhiệt",
    ],
    expiry: "Không có hạn sử dụng, nhưng cần kiểm tra định kỳ độ chính xác",
    notes: [
      "CẢNH BÁO: Thủy ngân rất độc, không được để vỡ",
      "Nếu vỡ, cần thu gom cẩn thận và thông gió phòng",
      "Không dùng cho trẻ nhỏ không có người giám sát",
      "Hiện nay khuyến nghị dùng nhiệt kế điện tử thay thế",
    ],
  },
  "nebulizer mask": {
    name_vi: "mặt nạ máy xông",
    name_en: "nebulizer mask",
    usage: [
      "Đeo mặt nạ lên mũi và miệng khi sử dụng máy xông",
      "Đảm bảo mặt nạ vừa khít với khuôn mặt",
      "Hít thở bình thường trong quá trình xông",
    ],
    storage: [
      "Rửa sạch bằng nước ấm và xà phòng sau mỗi lần dùng",
      "Để khô tự nhiên, tránh phơi nắng",
      "Bảo quản trong túi sạch, khô ráo",
    ],
    expiry: "Thay mới sau 3-6 tháng sử dụng hoặc khi bị mòn, rách",
    notes: [
      "Vệ sinh mặt nạ sau mỗi lần sử dụng",
      "Không dùng chung mặt nạ với người khác",
      "Kiểm tra độ kín khít trước khi sử dụng",
      "Thay mới khi mặt nạ bị mòn hoặc rách",
    ],
  },
  "pulse oximeter": {
    name_vi: "máy đo độ bão hòa oxy",
    name_en: "pulse oximeter",
    usage: [
      "Đặt ngón tay vào khe của máy",
      "Giữ yên tay trong khi đo",
      "Đọc kết quả SpO2 và nhịp tim trên màn hình",
    ],
    storage: [
      "Tắt máy sau khi sử dụng để tiết kiệm pin",
      "Bảo quản nơi khô ráo, tránh ẩm ướt",
      "Lau sạch cảm biến bằng vải mềm",
    ],
    expiry: "Pin có thể dùng 1-2 năm, máy không có hạn sử dụng",
    notes: [
      "Làm sạch ngón tay trước khi đo",
      "Không sơn móng tay hoặc để móng tay quá dài",
      "Giữ yên tay trong quá trình đo",
      "Kết quả bình thường: SpO2 ≥ 95%",
    ],
  },
  "reflex hammer": {
    name_vi: "búa phản xạ",
    name_en: "reflex hammer",
    usage: [
      "Dùng để kiểm tra phản xạ thần kinh",
      "Gõ nhẹ vào các điểm phản xạ như đầu gối, khuỷu tay",
      "Quan sát phản ứng của cơ thể",
    ],
    storage: [
      "Rửa sạch và khử trùng sau mỗi lần sử dụng",
      "Bảo quản trong hộp kín, khô ráo",
      "Tránh va đập làm biến dạng",
    ],
    expiry: "Không có hạn sử dụng, nhưng cần kiểm tra định kỳ",
    notes: [
      "Chỉ dùng cho mục đích y tế chuyên nghiệp",
      "Luôn khử trùng trước và sau khi sử dụng",
      "Không dùng lực quá mạnh khi gõ",
    ],
  },
  "stethoscope": {
    name_vi: "ống nghe",
    name_en: "stethoscope",
    usage: [
      "Đặt ống nghe lên ngực, lưng để nghe tim phổi",
      "Đảm bảo màng nghe áp sát da",
      "Giữ yên lặng trong khi nghe",
    ],
    storage: [
      "Lau sạch bằng cồn 70 độ sau mỗi lần dùng",
      "Bảo quản trong hộp hoặc treo nơi khô ráo",
      "Tránh để gập ống nghe quá mạnh",
    ],
    expiry: "Không có hạn sử dụng, nhưng nên thay ống nghe khi bị mòn",
    notes: [
      "Vệ sinh ống nghe sau mỗi bệnh nhân",
      "Kiểm tra độ kín của màng nghe",
      "Không để ống nghe tiếp xúc với nhiệt độ cao",
      "Thay màng nghe khi bị mòn hoặc rách",
    ],
  },
  "surgical scissors": {
    name_vi: "kéo phẫu thuật",
    name_en: "surgical scissors",
    usage: [
      "Dùng để cắt băng gạc, chỉ khâu",
      "Hỗ trợ trong các thủ thuật y tế",
      "Cắt vật liệu y tế cần thiết",
    ],
    storage: [
      "Rửa sạch và khử trùng sau mỗi lần sử dụng",
      "Bảo quản trong hộp kín, khô ráo",
      "Tránh để rơi hoặc va đập",
    ],
    expiry: "Không có hạn sử dụng, nhưng cần kiểm tra độ sắc định kỳ",
    notes: [
      "Luôn khử trùng trước và sau khi sử dụng",
      "Không dùng kéo bị cùn hoặc gỉ",
      "Chỉ dùng cho mục đích y tế",
      "Cẩn thận khi sử dụng để tránh tai nạn",
    ],
  },
  "medical mask": {
    name_vi: "khẩu trang",
    name_en: "medical mask",
    usage: [
      "Đeo che kín mũi và miệng",
      "Đảm bảo mặt trong tiếp xúc với da",
      "Thay khẩu trang khi bị ướt hoặc bẩn",
    ],
    storage: [
      "Bảo quản trong bao bì kín, khô ráo",
      "Tránh ánh sáng trực tiếp và ẩm ướt",
      "Để xa tầm tay trẻ em",
    ],
    expiry: "Thường có hạn sử dụng 2-3 năm, kiểm tra trên bao bì",
    notes: [
      "Chỉ dùng một lần, không tái sử dụng",
      "Vứt bỏ đúng cách sau khi sử dụng",
      "Rửa tay trước và sau khi đeo/t tháo khẩu trang",
      "Không chạm vào mặt ngoài khẩu trang khi đang đeo",
    ],
  },
  "cotton balls": {
    name_vi: "bông gòn y tế",
    name_en: "cotton balls",
    usage: [
      "Dùng để lau sạch vết thương",
      "Thấm thuốc sát trùng",
      "Làm sạch da trước khi tiêm",
    ],
    storage: [
      "Bảo quản trong bao bì kín, khô ráo",
      "Tránh ẩm ướt và bụi bẩn",
      "Để nơi sạch sẽ, vô trùng",
    ],
    expiry: "Thường không có hạn sử dụng, nhưng nên dùng trong vòng 2-3 năm",
    notes: [
      "Chỉ dùng một lần, không tái sử dụng",
      "Rửa tay trước khi sử dụng",
      "Không chạm vào bông gòn bằng tay không",
      "Vứt bỏ đúng cách sau khi sử dụng",
    ],
  },
  "medical gloves": {
    name_vi: "găng tay y tế",
    name_en: "medical gloves",
    usage: [
      "Đeo găng tay trước khi tiếp xúc với bệnh nhân",
      "Thay găng tay sau mỗi bệnh nhân",
      "Rửa tay sau khi tháo găng tay",
    ],
    storage: [
      "Bảo quản trong bao bì kín, khô ráo",
      "Tránh ánh sáng trực tiếp và nhiệt độ cao",
      "Để nơi sạch sẽ, vô trùng",
    ],
    expiry: "Thường có hạn sử dụng 3-5 năm, kiểm tra trên bao bì",
    notes: [
      "Chỉ dùng một lần, không tái sử dụng",
      "Kiểm tra găng tay có bị rách trước khi sử dụng",
      "Rửa tay trước và sau khi đeo găng tay",
      "Vứt bỏ đúng cách sau khi sử dụng",
    ],
  },
  "infrared thermometer": {
    name_vi: "nhiệt kế hồng ngoại",
    name_en: "infrared thermometer",
    usage: [
      "Bật máy và chọn chế độ đo",
      "Đưa đầu đo cách trán 1-3cm",
      "Nhấn nút đo và đọc kết quả",
    ],
    storage: [
      "Tắt máy sau khi sử dụng",
      "Bảo quản trong hộp, tránh va đập",
      "Lau sạch đầu đo bằng vải mềm",
    ],
    expiry: "Pin có thể dùng 1-2 năm, máy không có hạn sử dụng",
    notes: [
      "Làm sạch đầu đo trước khi sử dụng",
      "Không đo khi trán bị ướt hoặc có mồ hôi",
      "Giữ yên trong quá trình đo",
      "Hiệu chuẩn định kỳ để đảm bảo độ chính xác",
    ],
  },
  "blood pressure monitor": {
    name_vi: "máy đo huyết áp",
    name_en: "blood pressure monitor",
    usage: [
      "Quấn vòng bít quanh cánh tay",
      "Bật máy và bơm hơi",
      "Đọc kết quả huyết áp và nhịp tim",
    ],
    storage: [
      "Tắt máy sau khi sử dụng",
      "Bảo quản nơi khô ráo, tránh ẩm ướt",
      "Lau sạch vòng bít sau mỗi lần dùng",
    ],
    expiry: "Pin có thể dùng 6-12 tháng, máy không có hạn sử dụng",
    notes: [
      "Nghỉ ngơi 5 phút trước khi đo",
      "Không uống cà phê, hút thuốc trước khi đo",
      "Giữ yên lặng trong quá trình đo",
      "Hiệu chuẩn định kỳ 1-2 lần/năm",
      "Kết quả bình thường: 120/80 mmHg",
    ],
  },
};

