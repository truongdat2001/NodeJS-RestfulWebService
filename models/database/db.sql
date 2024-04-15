-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 13, 2024 lúc 03:56 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `asm_nodejs`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `catalog`
--

CREATE TABLE `catalog` (
  `idCategory` int(10) NOT NULL,
  `nameCategory` varchar(50) NOT NULL,
  `dateCategory` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `catalog`
--

INSERT INTO `catalog` (`idCategory`, `nameCategory`, `dateCategory`) VALUES
(1, 'Sách văn học thiếu nhi', '2024-04-09'),
(2, 'Truyện manga', '2024-04-09'),
(3, 'Sách song ngữ', '2024-04-09'),
(4, 'Sách khoa học', '2024-04-09'),
(5, 'Sách giáo khoa', '2024-04-09'),
(8, 'Truyện dân gian', '2024-04-09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `id` int(10) NOT NULL,
  `idProduct` int(10) NOT NULL,
  `contents` varchar(200) NOT NULL,
  `dateComment` date NOT NULL,
  `idUsers` int(20) NOT NULL,
  `userName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `idProduct` int(11) NOT NULL,
  `nameProduct` varchar(50) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `dateProduct` date NOT NULL,
  `authorProduct` varchar(20) NOT NULL,
  `images` varchar(200) NOT NULL,
  `ISBN` varchar(200) NOT NULL,
  `publishingYear` year(4) NOT NULL,
  `numberOfPage` int(10) NOT NULL,
  `idCategory` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`idProduct`, `nameProduct`, `description`, `dateProduct`, `authorProduct`, `images`, `ISBN`, `publishingYear`, `numberOfPage`, `idCategory`) VALUES
(1, 'Những đôi mắt khoảng trời', 'Có thể nói là đối với bất kỳ một ai trong chúng ta, tuổi thơ đều là giai đoạn đáng nhớ nhất của cuộc đời mình, quãng đời đó có thể chứa những niềm vui hay nỗi buồn nhưng tất cả đều là ký ức khó quên. Với nhà văn Đào Quốc Vịnh, ông đã gói ghém tuổi thơ của mình vào nhiều những trang thơ và gần đây nhất, ông đã cho ra mắt cuốn tiểu thuyết “Những đôi mắt khoảng trời” do NXB Hội nhà văn phát hành. Ý nghĩa hơn khi cuốn sách đã đoạt giải 3 trong Cuộc vận động sáng tác văn học về đề tài thiếu nhi năm 2023.\n\nChúng ta hãy cùng đến với những chia sẻ của chính tác giả để hiểu thêm về cuốn tiểu thuyết nhiều xúc cảm này. ', '2024-04-08', 'Quốc Vịnh Đào', 'images/nhung-doi-mat-khoang-troi.png', '9786043910902', '2023', 200, 1),
(2, 'Cây gạo cõng mặt trời', 'Cây gạo già trổ hoa đỏ rực cong lưng cõng ông mặt trời, phát ra muôn vàn ánh sáng lấp lánh hắt xuống dòng sông. Anh em Nhện Xám rủ nhau nhả tơ, bện cáp leo lên. Nhưng, Nhện Hoa lại bị mụ Tò Vò bắt nhốt. Nhện Xám làm sao cứu em gái đây?\nBê Vàng hôm qua vừa tung tăng nơi đồng cỏ mênh mông, xanh non mơn mởn. Vậy mà hôm nay, đồng cỏ đột nhiên biến mất. Ai đã lấy cánh đồng cỏ non của Bê Vàng?\nNhững câu chuyện đáng yêu, ngộ nghĩnh về anh em Nhện Xám, Bê Vàng, Sáo Diều, Mèo Con, Sẻ Nâu, Bê Bê hay Gọng Vó đang chờ bạn khám phá trong cuốn sách xinh xắn này.\nNGUYỄN THU HẰNG\nSinh năm: 1976\nQuê quán: Phú An, Cao An, Cẩm Giàng, Hải Dương\nNghề nghiệp: Giáo viên\nSÁCH ĐÃ XUẤT BẢN:\n• Cánh thư bay, tập truyện thiếu nhi, NXB Dân trí, 2014.\n• Thì thầm cùng giọt sương, tập truyện thiếu nhi, NXB Kim Đồng, 2017.\n• Bám biển, tập truyện ngắn, NXB Thanh niên, 2017.\n• Mật thư trên ngọn đa, tập truyện thiếu nhi, NXB Kim Đồng, 2018.\n• Đảo thức, tập truyện ngắn, NXB Thanh niên, 2018.\n• Cánh đồng xa xăm, tập truyện ngắn, NXB Thanh niên, 2019.\n• Mưa ngâu, tập truyện ngắn, NXB Quân đội Nhân dân, 2020.\n• Mùa hoa lưng chừng gió, tập truyện thiếu nhi, NXB Kim Đồng, 2021.\nGIẢI THƯỞNG\n• Giải Khuyến khích, cuộc thi viết truyện ngắn của báo Văn Nghệ, 2015-2017.\n• Giải Ba, cuộc thi viết truyện ngắn và ký của Quỹ nhà văn Lê Lựu, 2016-2017.\n• Giải Nhì, cuộc thi viết “Đóa hoa Đồng thoại”, Eneos & Mogu Nhật Bản tại Việt Nam, 2020.\n• Giải Ba, cuộc thi viết “Hình ảnh người chiến sĩ CSGT”, Bộ Công an, 2020.\n• Giải C, giải thưởng VHNT Côn Sơn, lần VII cho tập truyện ngắn “Cánh thư bay”; lần thứ VIII cho các tập “Cánh đồng xa xăm”, “Thì thầm cùng giọt sương”.\n• Giải C, giải thưởng VHNT của Liên hiệp các hội VHNT Việt Nam, cho tập truyện “Mùa hoa lưng chừng gió”, năm 2021.', '2024-04-09', 'Nguyễn Thu Hằng', 'images/cay-gao-cong-mat-troi.png', '9786042238304', '2014', 108, 1),
(8, 'One Piece', 'Câu chuyện kể về Monkey D. Luffy, một chàng trai trẻ tuổi, được thần tượng thời thơ ấu của mình là Shanks \"Tóc Đỏ\" truyền cảm hứng trở thành một hải tặc, bắt đầu cuộc hành trình tại East Blue tìm kiếm kho báu danh giá và trở thành Vua Hải Tặc. Trong quá trình thành lập băng hải tặc Mũ Rơm, Luffy đã giải cứu và kết bạn với một kiếm sĩ tên là Roronoa Zoro(ロのノア ゾロ), và họ bắt đầu tìm kiếm One Piece. Họ tham gia vào cuộc hành trình cùng Nami(ナミ), một hoa tiêu; Usopp(ウソプ), một tay thiện xạ; Vinsmoke Sanji(ヴィンスモク サンジ), một đầu bếp. Họ có được một con tàu tên là Going Merry(ゴイング メリー) và đối đầu với những băng hải tặc khét tiếng của East Blue. Khi Luffy và đồng đội của cậu bắt đầu cuộc phiêu lưu của, những người khác tham gia vào băng sau đó trong bộ truyện, bao gồm Tony Tony Chopper(トニー チョパー), một bác sĩ và là một con tuần lộc biết nói; Nico Robin(ニコ ロビン), một nhà khảo cổ học; Franky(フランキー), một thợ đóng tàu cyborg; Brook(ブルーク), một nhạc công và Jinbei(ジンベイ), một người cá và là cựu thành viên của Thất vũ hải(七武海). Khi Going Merry bị hư hỏng không thể sửa chữa được, băng hải tặc Mũ Rơm đã sử dụng một con tàu mới tên là Thousand Sunny(サウサンド サーニー). Cùng nhau, họ chạm trán với những tên hải tặc, thợ săn tiền thưởng, tổ chức tội phạm, quân cách mạng, đặc vụ và Chính phủ thế giới, cùng nhiều bạn bè và kẻ thù khác.', '2024-04-10', 'Oda Eiichiro', 'images/1712732751602.png', '9786042070843', '1997', 4324, 2),
(9, 'Bản thiết kế vĩ đại', 'Bản thiết kế vĩ đại (tựa gốc tiếng Anh: The Grand Design) là một cuốn sách phổ biến khoa học được viết bởi các nhà vật lý Stephen Hawking và Leonard Mlodinow và được Bantam Books xuất bản trong năm 2010. Họ lập luận rằng việc Thiên Chúa là không cần thiết để giải thích nguồn gốc của vũ trụ, và rằng Vụ nổ lớn là một hệ quả của định luật vật lý mà thôi. Đáp lại những lời chỉ trích, Hawking đã nói: \"Người ta không thể chứng minh rằng Thiên Chúa không tồn tại, nhưng khoa học làm cho Thiên Chúa trở thành không cần thiết.\" Khi bị ép phải nêu quan điểm tôn giáo của mình trong bộ phim tài liệu của kênh Channel 4 Genius của Anh, ông đã khẳng định rằng ông không tin vào một cá nhân Thiên Chúa nào.\r\n\r\nCác tác giả của cuốn sách chỉ ra rằng lý thuyết thống nhất trường (một học thuyết dựa trên một mô hình đầu tiên của vũ trụ, bởi Albert Einstein và các nhà vật lý khác đề xuất) có thể không tồn tại. Cuốn sách xem xét lịch sử của kiến ​​thức khoa học về vũ trụ và giải thích M-lý thuyết 11 chiều, một lý thuyết được nhiều nhà vật lý hiện đại hỗ trợ.\r\n\r\nXuất bản tại Hoa Kỳ vào ngày 07 tháng 9 năm 2010, cuốn sách đã trở thành cuốn sách bán chạy số một trên Amazon.com chỉ một vài ngày sau khi công bố. Nó được xuất bản tại Anh Quốc vào ngày 09 tháng 9 năm 2010, và trở thành cuốn sách bán chạy số hai trên Amazon.co.uk vào cùng một ngày.', '2024-04-10', 'Stephen Hawking và L', 'images/1712733364009.png', '0553805371', '2010', 198, 4),
(10, 'Lúc Đó, Tôi Đã Chuyển Sinh Thành Slime', 'Câu chuyện bắt đầu với anh chàng Mikami Satoru, một nhân viên 37 tuổi sống cuộc sống chán chường và không vui vẻ gì. Trong một lần gặp cướp, anh đã bị mất mạng. Tưởng chừng cuộc sống chán ngắt ấy đã kết thúc... Nhưng không! Ấy lại chính là sự khởi đầu của một cuộc sống mới. Mikami thức dậy, thấy mình đang ở trong một thế giới kì lạ. Và điều quái dị là anh không còn hình dạng con người nữa mà đã trở thành quái vật Slime dẻo quẹo và không có mắt. Khi dần quen với hình dáng mới này, anh bắt đầu khám phá thế giới mới với cái tên Rimuru Tempest, cùng với những quái vật khác xây dựng quốc gia riêng và bắt đầu công cuộc thay đổi thế giới mới.', '2024-04-10', 'Kawakami Taiki', 'images/1712767734745.png', '9786043291865', '2014', 10024, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `rule` varchar(20) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `userName`, `password`, `email`, `rule`) VALUES
(5, 'nhungxinh', '1234', 'nhungkappi@gmail.com', 'user'),
(7, 'tiendat', '123', 'dattruong792001@gmail.com', 'admin'),
(8, 'dattruong792001@gmail.com', '1234', 'admin@gmail.com', 'user');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `catalog`
--
ALTER TABLE `catalog`
  ADD PRIMARY KEY (`idCategory`);

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_product-id_product` (`idProduct`),
  ADD KEY `id_user-id_user` (`idUsers`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`idProduct`),
  ADD KEY `id_catalog-id_category` (`idCategory`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `catalog`
--
ALTER TABLE `catalog`
  MODIFY `idCategory` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `idProduct` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `id_product-id_product` FOREIGN KEY (`idProduct`) REFERENCES `products` (`idProduct`),
  ADD CONSTRAINT `id_user-id_user` FOREIGN KEY (`idUsers`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `id_catalog-id_category` FOREIGN KEY (`idCategory`) REFERENCES `catalog` (`idCategory`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
