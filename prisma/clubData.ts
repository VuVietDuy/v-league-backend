import { fakerVI } from '@faker-js/faker';

export const clubData = [
  {
    name: 'Becamex Bình Dương',
    bio: `<p>CLB Becamex Bình Dương là một CLB bóng đá chuyên nghiệp tại Việt Nam, có trụ sở tại TP Thủ Dầu Một, Bình Dương, thuộc quyền sở hữu của Công ty Cổ phần CLB Bóng đá Becamex Bình Dương.
            <br/> CLB từng 4 lần giành chức vô địch quốc gia (2007, 2008, 2014, 2015).
            <br/>Tiền thân CLB bóng đá Becamex Bình Dương là CLB bóng đá cao su Bình Phước. Năm 1997, sau khi chia tách tỉnh đội bóng được chuyển về cho tỉnh Bình Dương, do Sở VHTT tỉnh Bình Dương quản lý. Năm 2002 là năm đánh dấu bước ngoặt khi tập đoàn Becamex phối hợp với Đài Truyền hình và Sở TDTT tỉnh tiếp quản, thành lập Công ty Cổ phần Bóng đá Bình Dương, đổi tên thành Câu lạc bộ Becamex Bình Dương cho đến nay.</p>`,
    shortName: 'BDFC',
    stadium: 'SVĐ Bình Dương',
    stadiumDescription: '(Sức chứa: 15.000 người)',
    coach: 'Nguyễn Công Mạnh',
    logoURL: 'https://vpf.vn/wp-content/uploads/2018/10/binh-duong-2021.png',
    foundedYear: 1997,
    createdAt: fakerVI.date.past(),
    updatedAt: fakerVI.date.recent(),
  },
  {
    name: 'Đông Á Thanh Hóa',
    shortName: 'DATH',
    bio: `<p>CLB Bóng đá Thanh Hóa, trụ sở tại số 37 Lê Quý Đôn, Phường Ba Đình, Thành phố Thanh Hóa, hiện đang thi đấu tại V.League 1.
        CLB Bóng đá Thanh Hóa  là một câu lạc bộ bóng đá chuyên nghiệp, có lịch sử lâu đời và từng đạt nhiều thành tích tại Việt Nam. Biệt danh của đội bóng là: Chiến binh Lam Sơn.</p>
        <p>Cuối năm 2020, sau những thay đổi thượng tầng, CLB Thanh Hóa đổi tên thành CLB Đông Á Thanh Hóa.</p>
        <p>Thành tích thi đấu:</p>
        <ul>
            <li>2011: Xếp thứ 7 giải VĐQG </li>
            <li>2012: Xếp thứ 11 giải VĐQG </li>
            <li>2013: Xếp thứ 5 giải VĐQG </li>
            <li>2014: Xếp thứ 3 giải VĐQG </li>
            <li>2015: Xếp thứ 3 giải VĐQG </li>
            <li>2016: Xếp thứ 6 giải VĐQG </li>
            <li>2017: Xếp thứ 2 giải VĐQG </li>
            <li>2018: Xếp thứ 2 Giải VĐQG , thứ Nhì Cúp QG </li>
            <li>2019: Xếp thứ 13 Giải VĐQG </li>
            <li>2020: Xếp thứ 11 Giải VĐQG </li>
            <li>2021: Xếp thứ 5 Giải VĐQG </li>
            <li>2022: Xếp thứ 8 Giải VĐQG </li>
            <li>2023: Xếp thứ 4 nhóm A Giải VĐQG, giành Cúp Quốc gia </li>
            <li>2023/24: Xếp thứ 8 Giải VĐQG, giành Cúp Quốc gia, giài Siêu Cúp Quốc gia 2023 </li>
        </ul>`,
    stadium: 'SVĐ Thanh Hóa',
    stadiumDescription: '(Sức chứa: 14.000 người)',
    coach: 'Popov Velizar Emilov',
    logoURL:
      'https://vpf.vn/wp-content/uploads/2018/10/Logo-CLB-Dong-A-Thanh-Hoa_chuan.png',
    foundedYear: 1998,
    createdAt: fakerVI.date.past(),
    updatedAt: fakerVI.date.recent(),
  },
  {
    name: 'Hồng Lĩnh Hà Tĩnh',
    shortName: 'HLHT',
    bio: `<div id="stab_main" class="tab-pane fade active in">
        <p></p><p>Sau mùa giải HNQG 2018 thi đấu khá thành công, xếp thứ 2 toàn giải. CLB Hà Nội B có cơ hội tranh suất thăng hạng V.League 2019 cùng với CLB Nam Định tại trận đấu play - off tuy nhiên không thành công. Tham dự Giải HNQG 2019, CLB Hà Nội B có tên gọi mới là CLB Hồng Lĩnh Hà Tĩnh. Hồng Lĩnh Hà Tĩnh đăng ký sân thi đấu chính thức là sân vận động Hà Tĩnh.</p>
        <p>Từ mùa giải 2020, CLB Hồng Lĩnh Hà Tĩnh thi đấu tại giải VĐQG, sân chơi cao nhất cấp CLB của bóng đá Việt Nam. Kết thúc VĐQG Night Wolf 2023/24, CLB Hồng Lĩnh Hà Tĩnh phải đá play-off và thắng CLB PVF-CAND với tỷ số 3-2 để tiếp tục góp mặt tại VĐQG LPBank 2024/25.</p><p></p>
        </div>`,
    stadium: 'SVĐ Hà Tĩnh ',
    stadiumDescription: '(Sức chứa: 10.000 người)',
    coach: 'Nguyễn Thành Công',
    logoURL:
      'https://vpf.vn/wp-content/uploads/2018/10/Logo-Ha-Tinh-update.png',
    foundedYear: 2003,
    createdAt: fakerVI.date.past(),
    updatedAt: fakerVI.date.recent(),
  },
  {
    name: 'Hoàng Anh Gia Lai',
    shortName: 'HAGL',
    bio: `<p>Năm 2002 UBND tỉnh Gia Lai quyết định chuyển giao đội bóng đá Hạng Nhất từ Sở TDTT tỉnh Gia Lai cho Xí nghiệp tư doanh (XNTD) Hoàng Anh - Pleiku theo chương trình Xã hội hóa TDTT do Chính phủ phát động. Sau khi tiếp nhận, đội bóng được xây dựng theo mô hình chuyên nghiệp.<br>
    Chỉ sau năm năm, CLB BĐ HAGL gặt hái những thành công vang dội tại Giải VĐQG và Cúp QG. Từ đó CLB tiếp tục xây dựng thêm những hạng mục cần thiết để phục vụ nhu cầu đào tạo cầu thủ trẻ và hoàn thiện việc xây dựng Học viện Bóng đá HAGL - Arsenal - JMG với hệ thống sân tập tiêu chuẩn cùng những trang thiết bị hiện đại nhất Việt Nam thời điểm đó.<br>
    Ngày 28/5/2007, Học viện bóng đá HAGL - Arsenal - JMG chính thức mở cuộc tuyển sinh khóa I, với hơn 7.000 học viên của 22 tỉnh thành trên cả nước tham gia thi tuyển.<br>
    Đến nay, Học viện HAGL đã đào tạo được những cầu thủ giỏi về Văn hóa và Bóng đá như: Xuân Trường, Công Phượng, Văn Toàn, Văn Thanh, Hồng Duy...</p>`,
    stadium: 'SVĐ Pleiku',
    stadiumDescription: '(Sức chứa: 10.000 người)',
    coach: 'Lê Quang Trãi',
    logoURL: 'https://vpf.vn/wp-content/uploads/2018/10/Logo-HAGL.jpg',
    foundedYear: 1999,
    createdAt: fakerVI.date.past(),
    updatedAt: fakerVI.date.recent(),
  },
  {
    name: 'Hải Phòng',
    shortName: 'HPFC',
    bio: `<ul>
	<li>Câu lạc bộ bóng đá Hải Phòng có trụ sở tại thành phố Hải Phòng, thi đấu tại hệ thống các Giải Bóng đá chuyên nghiệp Quốc gia. Biệt danh là đội bóng đất Cảng hoặc đội bóng thành phố Hoa phượng đỏ.</li>
	<li>Một số thành tích nổi bật của đội bóng trong những năm gần đây:<br>
    Năm 2014, CLB Hải Phòng vô địch Cúp Quốc gia.<br>
    Năm 2015, CLB Hải Phòng đoạt Giải Ba Cúp Quốc gia<br>
    Mùa giải 2016, CLB Hải Phòng đã xuất sắc cán đích với vị trí Á Quân tại Giải VĐQG 2016, khi kém hơn CLB Hà Nội T&amp;T ở chỉ số phụ.<br>
    Mùa giải 2017: Hải Phòng đứng thứ 7 tại Giải VĐQG.<br>
    Mùa giải 2018: Hải Phòng xếp thứ 8 tại Giải VĐQG.<br>
    Mùa giải 2019: Hải Phòng xếp thứ 12 tại Giải VĐQG.<br>
    Mùa giải 2020: Hải Phòng xếp thứ 12 tại Giải VĐQG.</li>
    </ul>`,
    stadium: 'SVĐ Lạch Tray',
    stadiumDescription: ' (Sức chứa: 30.000 người)',
    coach: 'Chu Đình Nghiêm',
    logoURL: 'https://vpf.vn/wp-content/uploads/2018/10/haiphongfc.jpg',
    foundedYear: 2002,
    createdAt: fakerVI.date.past(),
    updatedAt: fakerVI.date.recent(),
  },
  {
    name: 'Hà Nội',
    shortName: 'HNFC',
    bio: `<p>Sau hơn 10 năm ra đời, định hình và phát triển, Hà Nội FC ( tiền thân là CLB BĐ Hà Nội T&T ) đã trở thành một trong những clb hàng đầu của bóng đá Việt Nam. Xuất phát bằng kỷ lục 3 năm thăng 3 hạng giúp Hà Nội FC nhanh chóng góp mặt tại V.League vào năm 2009, đến nay niềm tự hào bóng đá Thủ đô luôn có thành tích ổn định trong top đầu. Trải qua 8 mùa bóng liên tiếp, Hà Nội FC xuất hiện trong 2 vị trí cao nhất tại V.League, trong đó đại diện bóng đá Thủ đô đã lên ngôi vô địch 3 lần vào mùa bóng 2010, 2013 và 2016. Riêng tại V.League 2016, chức vô địch của Hà Nội được đánh giá là kỳ tích hiếm thấy trong lịch sử bóng đá Việt Nam.</p>

    <p>Thành công của Hà Nội FC trong những năm qua đã gây tiếng vang vượt ra khỏi bóng đá Việt Nam. Sau chức vô địch V.League 2016, Hà Nội FC đã vinh dự nhận được thư chúc mừng của Chủ tịch LĐBĐ thế giới (FIFA) Gianni Infantino. Đây là lần thứ 2, niềm tự hào bóng đá Thủ đô nhận được thư chúc mừng của người đứng đầu bóng đá thế giới.</p>

    <p>Ngoài thành công trên đấu trường V.League, Hà Nội FC cũng đang là lò đào tạo trẻ chất lượng bậc nhất của bóng đá Việt Nam. U21 Hà Nội FC đã 3 lần vô địch giải U21 báo Thanh Niên (2013, 2015 và 2016), U19 Hà Nội FC đoạt chức vô địch U19 quốc gia năm 2011, 2013, 2016 và 2017. Lứa U17 và U15 của Hà Nội FC đều đặn đứng trong top đầu tại các giải quốc gia dành cho các lứa tuổi. Những cầu thủ trẻ của lò đào tạo Hà Nội FC như Quang Hải, Đoàn Văn Hậu… đã góp công lớn trong kỳ tích đưa đội U19 Việt Nam lọt vào VCK World Cup U20 2017 và giành HCB tại VCK U23 Châu Á 2018.</p>`,
    stadium: 'SVĐ Hàng Đẫy',
    stadiumDescription: '(Sức chứa: 22.500 người)',
    coach: 'Hoàng Văn Phúc',
    logoURL: 'https://vpf.vn/wp-content/uploads/2018/10/HNFC-6-sao.png',
    foundedYear: 1990,
    createdAt: fakerVI.date.past(),
    updatedAt: fakerVI.date.recent(),
  },
  {
    name: 'Công An Hà Nội',
    bio: `<p>CLB Công An Hà Nội là đội bóng đại diện cho Thủ đô, với bề dày truyền thống và sự đầu tư mạnh mẽ trong những năm gần đây.</p>`,
    shortName: 'CAHN',
    stadium: 'SVĐ Hàng Đẫy',
    stadiumDescription: '(Sức chứa: 22.500 người)',
    coach: 'Polking Alexandre',
    logoURL: 'https://vpf.vn/wp-content/uploads/2018/10/cong-an-ha-noi-fc.png',
    foundedYear: 1956,
    createdAt: fakerVI.date.past(),
    updatedAt: fakerVI.date.recent(),
  },
  {
    name: 'Sông Lam Nghệ An',
    bio: `<p>CLB Sông Lam Nghệ An là một trong những đội bóng giàu truyền thống nhất Việt Nam, với hệ thống đào tạo trẻ mạnh mẽ và thành tích đáng nể trong lịch sử V.League.</p>`,
    shortName: 'SLNA',
    stadium: 'SVĐ Vinh',
    stadiumDescription: '(Sức chứa: 18.000 người)',
    coach: 'Bùi Đoàn Quang Huy',
    logoURL: 'https://vpf.vn/wp-content/uploads/2018/10/slna-1920x2476.png',
    foundedYear: 1979,
    createdAt: fakerVI.date.past(),
    updatedAt: fakerVI.date.recent(),
  },
  {
    name: 'TP Hồ Chí Minh',
    bio: `<p>CLB TP Hồ Chí Minh là một trong những đội bóng đại diện cho thành phố lớn nhất Việt Nam. Đội bóng đã có những bước phát triển mạnh mẽ trong những năm gần đây.</p>`,
    shortName: 'HCMFC',
    stadium: 'SVĐ Thống Nhất',
    stadiumDescription: '(Sức chứa: 15.000 người)',
    coach: 'Bùi Đoàn Quang Huy',
    logoURL: 'https://vpf.vn/wp-content/uploads/2018/10/HCM-FC-2023.png',
    foundedYear: 1975,
    createdAt: fakerVI.date.past(),
    updatedAt: fakerVI.date.recent(),
  },
  {
    name: 'Quy Nhơn Bình Định',
    bio: `<p>CLB Quy Nhơn Bình Định là đội bóng đang có sự đầu tư mạnh mẽ và là một trong những đội bóng đáng chú ý tại V.League.</p>`,
    shortName: 'BĐFC',
    stadium: 'SVĐ Quy Nhơn',
    stadiumDescription: '(Sức chứa: 25.000 người)',
    coach: 'Bùi Đoàn Quang Huy',
    logoURL: 'https://vpf.vn/wp-content/uploads/2018/10/Binh-Dinh.png',
    foundedYear: 1975,
    createdAt: fakerVI.date.past(),
    updatedAt: fakerVI.date.recent(),
  },
  {
    name: 'Thép Xanh Nam Định',
    bio: `<p>CLB Thép Xanh Nam Định là đội bóng có lượng cổ động viên cuồng nhiệt và sân vận động luôn tạo ra không khí sôi động.</p>`,
    shortName: 'NDFC',
    stadium: 'SVĐ Thiên Trường',
    stadiumDescription: '(Sức chứa: 30.000 người)',
    coach: 'Vũ Hồng Việt',
    logoURL: 'https://vpf.vn/wp-content/uploads/2018/10/Nam-Dinh-2024.png',
    foundedYear: 1965,
    createdAt: fakerVI.date.past(),
    updatedAt: fakerVI.date.recent(),
  },
  {
    name: 'Thể Công – Viettel',
    bio: `<div>
        <p></p><p>CLB Thể Công Viettel là đội bóng chuyên nghiệp tại Việt Nam, có trụ sở tại Hòa Lạc. Sau nhiều thăng trầm, đội bóng này góp mặt tại các giải BĐCN QG từ mùa giải 2016 với tên Viettel. Từ giữa mùa giải 2023/24, CLB Viettel đổi tên thành CLB Thể Công Viettel.</p>
        <ul>
            <li>2015: Thi đấu tại Giải hạng Nhì, giành quyền tham dự Giải HNQG 2016</li>
            <li>2016: Xếp thứ 2 Giải HNQG</li>
            <li>2017: Xếp thứ 4 Giải HNQG</li>
            <li>2018: Vô địch Giải HNQG, thăng hạng thi đấu tại Giải VĐQG 2019</li>
            <li>2019: Xếp thứ 6 Giải VĐQG</li>
            <li>2020: Vô địch Giải VĐQG.</li>
            <li>2023: HCĐ VĐQG</li>
        </ul><p></p>
        </div>`,
    shortName: 'TCVT',
    stadium: 'SVĐ Mỹ Đình',
    stadiumDescription: '(Sức chứa: 40.000 người)',
    coach: 'Nguyễn Đức Thắng',
    logoURL:
      'https://vpf.vn/wp-content/uploads/2018/10/Logo-The-Cong-Viettel.jpg',
    foundedYear: 2000,
    createdAt: fakerVI.date.past(),
    updatedAt: fakerVI.date.recent(),
  },
  {
    name: 'SHB Đà Nẵng',
    bio: `<div id="stab_main" class="tab-pane fade active in">
        <p></p><p>CLB Bóng đá SHB Đà Nẵng tiền thân là CLB bóng đá Thành phố Đà Nẵng, được thành lập năm 1976 và là một trong các đội bóng mạnh của Việt Nam.<br>
        Từ năm thành lập cho đến nay, CLB Bóng đá SHB Đà Nẵng đã đạt được nhiều thành tích cao tại nhiều giải đấu và là một trong các CLB có nền tảng vững mạnh trong nhiều năm qua với hệ thống đào tạo trẻ đứng hàng đầu quốc gia. Hàng năm các cầu thủ của CLB được gọi tập trung đội tuyển từ U16 đến U19, U22, U23 Quốc gia, đội tuyển nam quốc gia, mỗi tuyến từ 2 đến 4 cầu thủ, đây cũng là niềm tự hào của CLB.</p>
        <p>Kết thúc mùa giải 2023, CLB SHB Đà Nẵng đứng cuối bảng xếp hạng và phải xuống chơi tại HNQG 2023/24. Tới mùa giải 2024/25, CLB SHB Đà Nẵng giành quyền trở lại VĐQG sau khi vô địch HNQG 2023/24.</p><p></p>
    </div>`,
    shortName: 'SHBDN',
    stadium: 'SVĐ Hòa Xuân',
    stadiumDescription: '(Sức chứa: 20.000 người)',
    coach: 'Lê Đức Tuấn',
    logoURL: 'https://vpf.vn/wp-content/uploads/2018/10/shb-da-nang-2021.png',
    foundedYear: 2001,
    createdAt: fakerVI.date.past(),
    updatedAt: fakerVI.date.recent(),
  },
  {
    name: 'Quảng Nam',
    bio: `<div id="stab_main" class="tab-pane fade active in">
        <p></p><p>CLB Quảng Nam là đội bóng đá chuyên nghiệp đang thi đấu tại hệ thống các Giải Bóng đá chuyên nghiệp Quốc Gia. Sau nhiều mùa giải gắn tên đội bóng với các nhà tài trợ, từ mùa giải 2017, chính thức mang tên CLB Quảng Nam. Thành tích cao nhất đội bóng đạt được là chức Vô địch V.League 2017, tham dự Siêu cúp Quốc gia năm 2017, đội bóng lần đầu tiên trong lịch sử giành Siêu Cúp QG 2017.&nbsp;&nbsp;<br>
        Năm 2020, sau một mùa giải thất bại, Quảng Nam xuống thi đấu tại giải Hạng Nhất Quốc gia 2021. Đến năm 2023, CLB Quảng Nam đã vô địch giải HNQG,    thăng hạng lên V.League 1-2023/24. Do sân Tam Kỳ đang hoàn thiện cơ sở vật chất, một số vòng đầu tiên của mùa giải 2024/25, CLB Quảng Nam thạm dự  LPBank V.League 1-2024/25 với sân nhà là sân Hòa Xuân (Đà Nẵng).</p><p></p>
        </div>`,
    shortName: 'QNFC',
    stadium: 'SVĐ Tam Kỳ',
    stadiumDescription: ' (Sức chứa: 15.000 người)',
    coach: 'Văn Sỹ Sơn',
    logoURL: 'https://vpf.vn/wp-content/uploads/2018/10/Quang-Nam.jpg',
    foundedYear: 2001,
    createdAt: fakerVI.date.past(),
    updatedAt: fakerVI.date.recent(),
  },
];
