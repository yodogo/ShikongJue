/**
 * 飞花令诗词库
 * 包含常用关键字及李白、苏轼的代表性诗句
 * 支持自动从扩展库中获取新诗句
 */

// 核心诗词库（游戏中使用）- 李白 vs 苏轼
export const poetryDB = {
    "月": [
        { text: "床前明月光，疑是地上霜。", author: "李白", source: "《静夜思》" },
        { text: "举头望明月，低头思故乡。", author: "李白", source: "《静夜思》" },
        { text: "举杯邀明月，对影成三人。", author: "李白", source: "《月下独酌》" },
        { text: "月既不解饮，影徒随我身。", author: "李白", source: "《月下独酌》" },
        { text: "暂伴月将影，行乐须及春。", author: "李白", source: "《月下独酌》" },
        { text: "永结无情游，相期邈云汉。", author: "李白", source: "《月下独酌》" },
        { text: "明月出天山，苍茫云海间。", author: "李白", source: "《关山月》" },
        { text: "汉下白登道，胡窥青海湾。", author: "李白", source: "《关山月》" },
        { text: "由来征战地，不见有人还。", author: "李白", source: "《关山月》" },
        { text: "戍客望边色，思归多苦颜。", author: "李白", source: "《关山月》" },
        { text: "我寄愁心与明月，随君直到夜郎西。", author: "李白", source: "《闻王昌龄左迁龙标遥有此寄》" },
        { text: "唯愿当歌对酒时，月照金樽里。", author: "李白", source: "《把酒问月》" },
        { text: "古人今人若流水，共看明月皆如此。", author: "李白", source: "《把酒问月》" },
        { text: "青天有月来几时，我今停杯一问之。", author: "李白", source: "《把酒问月》" },
        { text: "人攀明月不可得，月行却与人相随。", author: "李白", source: "《把酒问月》" },
        { text: "皎如飞镜临丹阙，绿烟灭尽清辉发。", author: "李白", source: "《把酒问月》" },
        { text: "但见宵从海上来，宁知晓向云间没。", author: "李白", source: "《把酒问月》" },
        { text: "白兔捣药秋复春，嫦娥孤栖与谁邻。", author: "李白", source: "《把酒问月》" },
        { text: "今人不见古时月，今月曾经照古人。", author: "李白", source: "《把酒问月》" },
        { text: "且就洞庭赊月色，将船买酒白云边。", author: "李白", source: "《陪族叔刑部侍郎晔及中书贾舍人至游洞庭》" },
        { text: "俱怀逸兴壮思飞，欲上青天览明月。", author: "李白", source: "《宣州谢朓楼饯别校书叔云》" },
        { text: "明月几时有？把酒问青天。", author: "苏轼", source: "《水调歌头·明月几时有》" },
        { text: "不知天上宫阙，今夕是何年。", author: "苏轼", source: "《水调歌头·明月几时有》" },
        { text: "我欲乘风归去，又恐琼楼玉宇，高处不胜寒。", author: "苏轼", source: "《水调歌头·明月几时有》" },
        { text: "起舞弄清影，何似在人间。", author: "苏轼", source: "《水调歌头·明月几时有》" },
        { text: "转朱阁，低绮户，照无眠。", author: "苏轼", source: "《水调歌头·明月几时有》" },
        { text: "不应有恨，何事长向别时圆。", author: "苏轼", source: "《水调歌头·明月几时有》" },
        { text: "人有悲欢离合，月有阴晴圆缺，此事古难全。", author: "苏轼", source: "《水调歌头·明月几时有》" },
        { text: "但愿人长久，千里共婵娟。", author: "苏轼", source: "《水调歌头·明月几时有》" },
        { text: "缺月挂疏桐，漏断人初静。", author: "苏轼", source: "《卜算子·黄州定慧院寓居作》" },
        { text: "谁见幽人独往来，缥缈孤鸿影。", author: "苏轼", source: "《卜算子·黄州定慧院寓居作》" },
        { text: "拣尽寒枝不肯栖，寂寞沙洲冷。", author: "苏轼", source: "《卜算子·黄州定慧院寓居作》" },
        { text: "明月别枝惊鹊，清风半夜鸣蝉。", author: "苏轼", source: "《西江月·夜行黄沙道中》" },
        { text: "旧时茅店社林边，路转溪桥忽见。", author: "苏轼", source: "《西江月·夜行黄沙道中》" },
        { text: "料得年年肠断处，明月夜，短松冈。", author: "苏轼", source: "《江城子·乙卯正月二十日夜记梦》" },
        { text: "人生如梦，一尊还酹江月。", author: "苏轼", source: "《念奴娇·赤壁怀古》" },
        { text: "淮水东边旧时月，夜深还过女墙来。", author: "苏轼", source: "《金陵怀古》" },
        { text: "唯江上之清风，与山间之明月。", author: "苏轼", source: "《赤壁赋》" },
        { text: "庭下如积水空明，水中藻荇交横，盖竹柏影也。", author: "苏轼", source: "《记承天寺夜游》" },
        { text: "何夜无月，何处无竹柏。", author: "苏轼", source: "《记承天寺夜游》" },
        { text: "可惜一溪风月，莫教踏碎琼瑶。", author: "苏轼", source: "《西江月·顷在黄州》" },
    ],
    "花": [
        { text: "烟花三月下扬州。", author: "李白", source: "《黄鹤楼送孟浩然之广陵》" },
        { text: "故人西辞黄鹤楼，烟花三月下扬州。", author: "李白", source: "《黄鹤楼送孟浩然之广陵》" },
        { text: "孤帆远影碧空尽，唯见长江天际流。", author: "李白", source: "《黄鹤楼送孟浩然之广陵》" },
        { text: "桃花潭水深千尺，不及汪伦送我情。", author: "李白", source: "《赠汪伦》" },
        { text: "李白乘舟将欲行，忽闻岸上踏歌声。", author: "李白", source: "《赠汪伦》" },
        { text: "两人对酌山花开，一杯一杯复一杯。", author: "李白", source: "《山中与幽人对酌》" },
        { text: "我醉欲眠卿且去，明朝有意抱琴来。", author: "李白", source: "《山中与幽人对酌》" },
        { text: "花间一壶酒，独酌无相亲。", author: "李白", source: "《月下独酌》" },
        { text: "山花照坞复烧溪，树树枝枝尽可迷。", author: "李白", source: "《万山潭》" },
        { text: "问余何事栖碧山，笑而不答心自闲。", author: "李白", source: "《山中问答》" },
        { text: "桃花落尽留不住，随水东流化作尘。", author: "李白", source: "《古风》" },
        { text: "看花满眼泪，不共楚王言。", author: "李白", source: "《怨情》" },
        { text: "自是桃花贪结子，不辞风雨助开花。", author: "李白", source: "《寄东鲁二稚子》" },
        { text: "名花倾国两相欢，常得君王带笑看。", author: "李白", source: "《清平调》" },
        { text: "云想衣裳花想容，春风拂槛露华浓。", author: "李白", source: "《清平调》" },
        { text: "若非群玉山头见，会向瑶台月下逢。", author: "李白", source: "《清平调》" },
        { text: "一枝红艳露凝香，云雨巫山枉断肠。", author: "李白", source: "《清平调》" },
        { text: "借问汉宫谁得似，可怜飞燕倚新妆。", author: "李白", source: "《清平调》" },
        { text: "名花倾国两相欢，长得君王带笑看。", author: "李白", source: "《清平调》" },
        { text: "解释春风无限恨，沉香亭北倚栏杆。", author: "李白", source: "《清平调》" },
        { text: "黄四娘家花满蹊，千朵万朵压枝低。", author: "杜甫", source: "《江畔独步寻花》" },
        { text: "留连戏蝶时时舞，自在娇莺恰恰啼。", author: "杜甫", source: "《江畔独步寻花》" },
        { text: "桃花一簇开无主，可爱深红爱浅红。", author: "杜甫", source: "《江畔独步寻花》" },
        { text: "花径不曾缘客扫，蓬门今始为君开。", author: "杜甫", source: "《客至》" },
        { text: "感时花溅泪，恨别鸟惊心。", author: "杜甫", source: "《春望》" },
        { text: "晓看红湿处，花重锦官城。", author: "杜甫", source: "《春夜喜雨》" },
        { text: "只恐夜深花睡去，故烧高烛照红妆。", author: "苏轼", source: "《海棠》" },
        { text: "东风袅袅泛崇光，香雾空蒙月转廊。", author: "苏轼", source: "《海棠》" },
        { text: "花褪残红青杏小。燕子飞时，绿水人家绕。", author: "苏轼", source: "《蝶恋花·春景》" },
        { text: "枝上柳绵吹又少，天涯何处无芳草。", author: "苏轼", source: "《蝶恋花·春景》" },
        { text: "墙里秋千墙外道，墙外行人，墙里佳人笑。", author: "苏轼", source: "《蝶恋花·春景》" },
        { text: "笑渐不闻声渐悄，多情却被无情恼。", author: "苏轼", source: "《蝶恋花·春景》" },
        { text: "竹外桃花三两枝，春江水暖鸭先知。", author: "苏轼", source: "《惠崇春江晚景》" },
        { text: "蒌蒿满地芦芽短，正是河豚欲上时。", author: "苏轼", source: "《惠崇春江晚景》" },
        { text: "诗意之地何须见，桃花源里人家。", author: "苏轼", source: "《和陶归园田居》" },
        { text: "桃花源里耕耘客，不是人间富贵花。", author: "苏轼", source: "《和钱穆父》" },
        { text: "荷叶罗裙一色裁，芙蓉向脸两边开。", author: "王昌龄", source: "《采莲曲》" },
        { text: "乱花渐欲迷人眼，浅草才能没马蹄。", author: "白居易", source: "《钱塘湖春行》" },
        { text: "日出江花红胜火，春来江水绿如蓝。", author: "白居易", source: "《忆江南》" },
        { text: "人间四月芳菲尽，山寺桃花始盛开。", author: "白居易", source: "《大林寺桃花》" },
        { text: "长恨春归无觅处，不知转入此中来。", author: "白居易", source: "《大林寺桃花》" },
    ],
    "酒": [
        { text: "呼儿将出换美酒，与尔同销万古愁。", author: "李白", source: "《将进酒》" },
        { text: "五花马，千金裘，呼儿将出换美酒。", author: "李白", source: "《将进酒》" },
        { text: "君不见黄河之水天上来，奔流到海不复回。", author: "李白", source: "《将进酒》" },
        { text: "君不见高堂明镜悲白发，朝如青丝暮成雪。", author: "李白", source: "《将进酒》" },
        { text: "人生得意须尽欢，莫使金樽空对月。", author: "李白", source: "《将进酒》" },
        { text: "天生我材必有用，千金散尽还复来。", author: "李白", source: "《将进酒》" },
        { text: "烹羊宰牛且为乐，会须一饮三百杯。", author: "李白", source: "《将进酒》" },
        { text: "岑夫子，丹丘生，将进酒，杯莫停。", author: "李白", source: "《将进酒》" },
        { text: "与君歌一曲，请君为我倾耳听。", author: "李白", source: "《将进酒》" },
        { text: "钟鼓馔玉不足贵，但愿长醉不复醒。", author: "李白", source: "《将进酒》" },
        { text: "古来圣贤皆寂寞，惟有饮者留其名。", author: "李白", source: "《将进酒》" },
        { text: "陈王昔时宴平乐，斗酒十千恣欢谑。", author: "李白", source: "《将进酒》" },
        { text: "主人何为言少钱，径须沽取对君酌。", author: "李白", source: "《将进酒》" },
        { text: "五花马，千金裘，呼儿将出换美酒。", author: "李白", source: "《将进酒》" },
        { text: "与尔同销万古愁。", author: "李白", source: "《将进酒》" },
        { text: "兰陵美酒郁金香，玉碗盛来琥珀光。", author: "李白", source: "《客中行》" },
        { text: "但使主人能醉客，不知何处是他乡。", author: "李白", source: "《客中行》" },
        { text: "金樽清酒斗十千，玉盘珍羞直万钱。", author: "李白", source: "《行路难》" },
        { text: "停杯投箸不能食，拔剑四顾心茫然。", author: "李白", source: "《行路难》" },
        { text: "花间一壶酒，独酌无相亲。", author: "李白", source: "《月下独酌》" },
        { text: "且乐生前一杯酒，何须身后千载名。", author: "李白", source: "《行路难》" },
        { text: "两人对酌山花开，一杯一杯复一杯。", author: "李白", source: "《山中与幽人对酌》" },
        { text: "我醉欲眠卿且去，明朝有意抱琴来。", author: "李白", source: "《山中与幽人对酌》" },
        { text: "且就洞庭赊月色，将船买酒白云边。", author: "李白", source: "《陪族叔刑部侍郎晔及中书贾舍人至游洞庭》" },
        { text: "南湖秋水夜无烟，耐可乘流直上天。", author: "李白", source: "《游洞庭湖》" },
        { text: "且就洞庭赊月色，将船买酒白云边。", author: "李白", source: "《陪族叔刑部侍郎晔及中书贾舍人至游洞庭》" },
        { text: "愁来饮酒二千石，寒灰重暖生阳春。", author: "李白", source: "《江夏赠韦南陵》" },
        { text: "明月几时有？把酒问青天。", author: "苏轼", source: "《水调歌头·明月几时有》" },
        { text: "且将新火试新茶，诗酒趁年华。", author: "苏轼", source: "《望江南·超然台作》" },
        { text: "休对故人思故国，且将新火试新茶。", author: "苏轼", source: "《望江南·超然台作》" },
        { text: "诗酒尚堪驱使在，未容衰老向人前。", author: "苏轼", source: "《送襄阳同年李增》" },
        { text: "我饮不尽器，半酣味尤长。", author: "苏轼", source: "《和陶渊明饮酒》" },
        { text: "俯仰各有志，得酒诗自成。", author: "苏轼", source: "《和陶渊明饮酒》" },
        { text: "梦中了了醉中醒，只渊明，是前生。", author: "苏轼", source: "《江城子》" },
        { text: "走遍人间，却只在，醉心间。", author: "苏轼", source: "《醉落魄》" },
        { text: "醉翁之意不在酒，在乎山水之间也。", author: "欧阳修", source: "《醉翁亭记》" },
        { text: "山水之间，得之心而寓之酒也。", author: "欧阳修", source: "《醉翁亭记》" },
        { text: "宴酣之乐，非丝非竹，射者中，弈者胜，觥筹交错。", author: "欧阳修", source: "《醉翁亭记》" },
        { text: "苍颜白发，颓然乎其间者，太守醉也。", author: "欧阳修", source: "《醉翁亭记》" },
    ],
    "春": [
        { text: "谁家玉笛暗飞声，散入春风满洛城。", author: "李白", source: "《春夜洛城闻笛》" },
        { text: "此夜曲中闻折柳，何人不起故园情。", author: "李白", source: "《春夜洛城闻笛》" },
        { text: "云想衣裳花想容，春风拂槛露华浓。", author: "李白", source: "《清平调》" },
        { text: "燕草如碧丝，秦桑低绿枝。", author: "李白", source: "《春思》" },
        { text: "当君怀归日，是妾断肠时。", author: "李白", source: "《春思》" },
        { text: "春风不相识，何事入罗帏。", author: "李白", source: "《春思》" },
        { text: "春风知别苦，不遣柳条青。", author: "李白", source: "《劳劳亭》" },
        { text: "金陵劳劳送客堂，蔓草离离古道场。", author: "李白", source: "《劳劳亭》" },
        { text: "春阳如昨日，碧树鸣黄鹂。", author: "李白", source: " " },
        { text: "黄鹤楼中吹玉笛，江城五月落梅花。", author: "李白", source: "《与史郎中钦听黄鹤楼上吹笛》" },
        { text: "故人西辞黄鹤楼，烟花三月下扬州。", author: "李白", source: "《黄鹤楼送孟浩然之广陵》" },
        { text: "问余何事栖碧山，笑而不答心自闲。", author: "李白", source: "《山中问答》" },
        { text: "桃花落尽留不住，随水东流化作尘。", author: "李白", source: "《古风》" },
        { text: "东风随春归，发我枝上花。", author: "李白", source: "《落日忆山中》" },
        { text: "竹外桃花三两枝，春江水暖鸭先知。", author: "苏轼", source: "《惠崇春江晚景》" },
        { text: "蒌蒿满地芦芽短，正是河豚欲上时。", author: "苏轼", source: "《惠崇春江晚景》" },
        { text: "春色三分，二分尘土，一分流水。", author: "苏轼", source: "《水龙吟·次韵章质夫杨花词》" },
        { text: "细雨斜风作晓寒，淡烟疏柳媚晴滩。", author: "苏轼", source: "《浣溪沙·细雨斜风作晓寒》" },
        { text: "雪沫乳花浮午盏，蓼茸蒿笋试春盘。", author: "苏轼", source: "《浣溪沙·细雨斜风作晓寒》" },
        { text: "人间有味是清欢。", author: "苏轼", source: "《浣溪沙·细雨斜风作晓寒》" },
        { text: "料峭春风吹酒醒，微冷，山头斜照却相迎。", author: "苏轼", source: "《定风波》" },
        { text: "回首向来萧瑟处，归去，也无风雨也无晴。", author: "苏轼", source: "《定风波》" },
        { text: "枝上柳绵吹又少，天涯何处无芳草。", author: "苏轼", source: "《蝶恋花·春景》" },
        { text: "花褪残红青杏小。燕子飞时，绿水人家绕。", author: "苏轼", source: "《蝶恋花·春景》" },
        { text: "一年好景君须记，最是橙黄橘绿时。", author: "苏轼", source: "《赠刘景文》" },
        { text: "荷尽已无擎雨盖，菊残犹有傲霜枝。", author: "苏轼", source: "《赠刘景文》" },
        { text: "春宵一刻值千金，花有清香月有阴。", author: "苏轼", source: "《春宵》" },
        { text: "歌管楼台声细细，秋千院落夜沉沉。", author: "苏轼", source: "《春宵》" },
        { text: "春风又绿江南岸，明月何时照我还。", author: "王安石", source: "《泊船瓜洲》" },
        { text: "春眠不觉晓，处处闻啼鸟。", author: "孟浩然", source: "《春晓》" },
        { text: "夜来风雨声，花落知多少。", author: "孟浩然", source: "《春晓》" },
        { text: "红豆生南国，春来发几枝。", author: "王维", source: "《相思》" },
        { text: "愿君多采撷，此物最相思。", author: "王维", source: "《相思》" },
        { text: "人闲桂花落，夜静春山空。", author: "王维", source: "《鸟鸣涧》" },
        { text: "月出惊山鸟，时鸣春涧中。", author: "王维", source: "《鸟鸣涧》" },
        { text: "春潮带雨晚来急，野渡无人舟自横。", author: "韦应物", source: "《滁州西涧》" },
        { text: "独怜幽草涧边生，上有黄鹂深树鸣。", author: "韦应物", source: "《滁州西涧》" },
        { text: "春城无处不飞花，寒食东风御柳斜。", author: "韩翃", source: "《寒食》" },
        { text: "日暮汉宫传蜡烛，轻烟散入五侯家。", author: "韩翃", source: "《寒食》" },
        { text: "国破山河在，城春草木深。", author: "杜甫", source: "《春望》" },
        { text: "感时花溅泪，恨别鸟惊心。", author: "杜甫", source: "《春望》" },
        { text: "烽火连三月，家书抵万金。", author: "杜甫", source: "《春望》" },
        { text: "白头搔更短，浑欲不胜簪。", author: "杜甫", source: "《春望》" },
        { text: "好雨知时节，当春乃发生。", author: "杜甫", source: "《春夜喜雨》" },
        { text: "随风潜入夜，润物细无声。", author: "杜甫", source: "《春夜喜雨》" },
        { text: "野径云俱黑，江船火独明。", author: "杜甫", source: "《春夜喜雨》" },
        { text: "晓看红湿处，花重锦官城。", author: "杜甫", source: "《春夜喜雨》" },
    ],
    "风": [
        { text: "长风破浪会有时，直挂云帆济沧海。", author: "李白", source: "《行路难》" },
        { text: "长风万里送秋雁，对此可以酣高楼。", author: "李白", source: "《宣州谢朓楼饯别校书叔云》" },
        { text: "俱怀逸兴壮思飞，欲上青天览明月。", author: "李白", source: "《宣州谢朓楼饯别校书叔云》" },
        { text: "长风几万里，吹度玉门关。", author: "李白", source: "《关山月》" },
        { text: "明月出天山，苍茫云海间。", author: "李白", source: "《关山月》" },
        { text: "风吹柳花满店香，吴姬压酒劝客尝。", author: "李白", source: "《金陵酒肆留别》" },
        { text: "春风知别苦，不遣柳条青。", author: "李白", source: "《劳劳亭》" },
        { text: "东风随春归，发我枝上花。", author: "李白", source: "《落日忆山中》" },
        { text: "谁家玉笛暗飞声，散入春风满洛城。", author: "李白", source: "《春夜洛城闻笛》" },
        { text: "云想衣裳花想容，春风拂槛露华浓。", author: "李白", source: "《清平调》" },
        { text: "春风不相识，何事入罗帏。", author: "李白", source: "《春思》" },
        { text: "去年今日此门中，人面桃花相映红。", author: "崔护", source: "《题都城南庄》" },
        { text: "人面不知何处去，桃花依旧笑春风。", author: "崔护", source: "《题都城南庄》" },
        { text: "野火烧不尽，春风吹又生。", author: "白居易", source: "《赋得古原草送别》" },
        { text: "春风又绿江南岸，明月何时照我还。", author: "王安石", source: "《泊船瓜洲》" },
        { text: "爆竹声中一岁除，春风送暖入屠苏。", author: "王安石", source: "《元日》" },
        { text: "等闲识得东风面，万紫千红总是春。", author: "朱熹", source: "《春日》" },
        { text: "相见时难别亦难，东风无力百花残。", author: "李商隐", source: "《无题》" },
        { text: "春蚕到死丝方尽，蜡炬成灰泪始干。", author: "李商隐", source: "《无题》" },
        { text: "夜来风雨声，花落知多少。", author: "孟浩然", source: "《春晓》" },
        { text: "随风潜入夜，润物细无声。", author: "杜甫", source: "《春夜喜雨》" },
        { text: "风急天高猿啸哀，渚清沙白鸟飞回。", author: "杜甫", source: "《登高》" },
        { text: "八月秋高风怒号，卷我屋上三重茅。", author: "杜甫", source: "《茅屋为秋风所破歌》" },
        { text: "南村群童欺我老无力，忍能对面为盗贼。", author: "杜甫", source: "《茅屋为秋风所破歌》" },
        { text: "公然抱茅入竹去，唇焦口燥呼不得。", author: "杜甫", source: "《茅屋为秋风所破歌》" },
        { text: "回首向来萧瑟处，归去，也无风雨也无晴。", author: "苏轼", source: "《定风波》" },
        { text: "料峭春风吹酒醒，微冷，山头斜照却相迎。", author: "苏轼", source: "《定风波》" },
        { text: "一点浩然气，千里快哉风。", author: "苏轼", source: "《水龙吟》" },
        { text: "不知细叶谁裁出，二月春风似剪刀。", author: "贺知章", source: "《咏柳》" },
        { text: "千里黄云白日勋，北风吹雁雪纷纷。", author: "高适", source: "《别董大》" },
        { text: "莫愁前路无知己，天下谁人不识君。", author: "高适", source: "《别董大》" },
        { text: "大风起兮云飞扬。", author: "刘邦", source: "《大风歌》" },
        { text: "风萧萧兮易水寒，壮士一去兮不复还。", author: "荆轲", source: "《易水歌》" },
        { text: "解鞍欹枕绿杨桥，杜宇一声春晓。", author: "苏轼", source: "《西江月·顷在黄州》" },
        { text: "东风袅袅泛崇光，香雾空蒙月转廊。", author: "苏轼", source: "《海棠》" },
    ],
    "山": [
        { text: "相看两不厌，只有敬亭山。", author: "李白", source: "《独坐敬亭山》" },
        { text: "众鸟高飞尽，孤云独去闲。", author: "李白", source: "《独坐敬亭山》" },
        { text: "明月出天山，苍茫云海间。", author: "李白", source: "《关山月》" },
        { text: "长风几万里，吹度玉门关。", author: "李白", source: "《关山月》" },
        { text: "问余何事栖碧山，笑而不答心自闲。", author: "李白", source: "《山中问答》" },
        { text: "桃花落尽留不住，随水东流化作尘。", author: "李白", source: "《古风》" },
        { text: "山花照坞复烧溪，树树枝枝尽可迷。", author: "李白", source: "《万山潭》" },
        { text: "两人对酌山花开，一杯一杯复一杯。", author: "李白", source: "《山中与幽人对酌》" },
        { text: "我醉欲眠卿且去，明朝有意抱琴来。", author: "李白", source: "《山中与幽人对酌》" },
        { text: "蜀道之难，难于上青天。", author: "李白", source: "《蜀道难》" },
        { text: "尔来四万八千岁，不与秦塞通人烟。", author: "李白", source: "《蜀道难》" },
        { text: "西当太白有鸟道，可以横绝峨眉巅。", author: "李白", source: "《蜀道难》" },
        { text: "地崩山摧壮士死，然后天梯石栈相钩连。", author: "李白", source: "《蜀道难》" },
        { text: "连峰去天不盈尺，枯松倒挂倚绝壁。", author: "李白", source: "《蜀道难》" },
        { text: "不识庐山真面目，只缘身在此山中。", author: "苏轼", source: "《题西林壁》" },
        { text: "横看成岭侧成峰，远近高低各不同。", author: "苏轼", source: "《题西林壁》" },
        { text: "水光潋滟晴方好，山色空蒙雨亦奇。", author: "苏轼", source: "《饮湖上初晴后雨》" },
        { text: "欲把西湖比西子，淡妆浓抹总相宜。", author: "苏轼", source: "《饮湖上初晴后雨》" },
        { text: "乱石穿空，惊涛拍岸，卷起千堆雪。", author: "苏轼", source: "《念奴娇·赤壁怀古》" },
        { text: "江山如画，一时多少豪杰。", author: "苏轼", source: "《念奴娇·赤壁怀古》" },
        { text: "大江东去，浪淘尽，千古风流人物。", author: "苏轼", source: "《念奴娇·赤壁怀古》" },
        { text: "故垒西边，人道是，三国周郎赤壁。", author: "苏轼", source: "《念奴娇·赤壁怀古》" },
        { text: "山下兰芽短浸溪，松间沙路净无泥。", author: "苏轼", source: "《浣溪沙》" },
        { text: "空山新雨后，天气晚来秋。", author: "王维", source: "《山居秋暝》" },
        { text: "明月松间照，清泉石上流。", author: "王维", source: "《山居秋暝》" },
        { text: "竹喧归浣女，莲动下渔舟。", author: "王维", source: "《山居秋暝》" },
        { text: "随意春芳歇，王孙自可留。", author: "王维", source: "《山居秋暝》" },
        { text: "千山鸟飞绝，万径人踪灭。", author: "柳宗元", source: "《江雪》" },
        { text: "孤舟蓑笠翁，独钓寒江雪。", author: "柳宗元", source: "《江雪》" },
        { text: "白日依山尽，黄河入海流。", author: "王之涣", source: "《登鹳雀楼》" },
        { text: "欲穷千里目，更上一层楼。", author: "王之涣", source: "《登鹳雀楼》" },
        { text: "会当凌绝顶，一览众山小。", author: "杜甫", source: "《望岳》" },
        { text: "岱宗夫如何，齐鲁青未了。", author: "杜甫", source: "《望岳》" },
        { text: "造化钟神秀，阴阳割昏晓。", author: "杜甫", source: "《望岳》" },
        { text: "荡胸生曾云，决眦入归鸟。", author: "杜甫", source: "《望岳》" },
        { text: "采菊东篱下，悠然见南山。", author: "陶渊明", source: "《饮酒》" },
        { text: "山气日夕佳，飞鸟相与还。", author: "陶渊明", source: "《饮酒》" },
        { text: "此中有真意，欲辨已忘言。", author: "陶渊明", source: "《饮酒》" },
        { text: "青山遮不住，毕竟东流去。", author: "辛弃疾", source: "《菩萨蛮》" },
        { text: "西北望长安，可怜无数山。", author: "辛弃疾", source: "《菩萨蛮》" },
    ],
    "水": [
        { text: "桃花潭水深千尺，不及汪伦送我情。", author: "李白", source: "《赠汪伦》" },
        { text: "李白乘舟将欲行，忽闻岸上踏歌声。", author: "李白", source: "《赠汪伦》" },
        { text: "孤帆远影碧空尽，唯见长江天际流。", author: "李白", source: "《黄鹤楼送孟浩然之广陵》" },
        { text: "故人西辞黄鹤楼，烟花三月下扬州。", author: "李白", source: "《黄鹤楼送孟浩然之广陵》" },
        { text: "天门中断楚江开，碧水东流至此回。", author: "李白", source: "《望天门山》" },
        { text: "两岸青山相对出，孤帆一片日边来。", author: "李白", source: "《望天门山》" },
        { text: "朝辞白帝彩云间，千里江陵一日还。", author: "李白", source: "《早发白帝城》" },
        { text: "两岸猿声啼不住，轻舟已过万重山。", author: "李白", source: "《早发白帝城》" },
        { text: "君不见黄河之水天上来，奔流到海不复回。", author: "李白", source: "《将进酒》" },
        { text: "抽刀断水水更流，举杯消愁愁更愁。", author: "李白", source: "《宣州谢朓楼饯别校书叔云》" },
        { text: "人生在世不称意，明朝散发弄扁舟。", author: "李白", source: "《宣州谢朓楼饯别校书叔云》" },
        { text: "且就洞庭赊月色，将船买酒白云边。", author: "李白", source: "《陪族叔刑部侍郎晔及中书贾舍人至游洞庭》" },
        { text: "南湖秋水夜无烟，耐可乘流直上天。", author: "李白", source: "《游洞庭湖》" },
        { text: "水光潋滟晴方好，山色空蒙雨亦奇。", author: "苏轼", source: "《饮湖上初晴后雨》" },
        { text: "欲把西湖比西子，淡妆浓抹总相宜。", author: "苏轼", source: "《饮湖上初晴后雨》" },
        { text: "大江东去，浪淘尽，千古风流人物。", author: "苏轼", source: "《念奴娇·赤壁怀古》" },
        { text: "乱石穿空，惊涛拍岸，卷起千堆雪。", author: "苏轼", source: "《念奴娇·赤壁怀古》" },
        { text: "江山如画，一时多少豪杰。", author: "苏轼", source: "《念奴娇·赤壁怀古》" },
        { text: "惊涛拍岸，卷起千堆雪。", author: "苏轼", source: "《念奴娇·赤壁怀古》" },
        { text: "人生如梦，一尊还酹江月。", author: "苏轼", source: "《念奴娇·赤壁怀古》" },
        { text: "谁道人生无再少，门前流水尚能西。", author: "苏轼", source: "《浣溪沙》" },
        { text: "山下兰芽短浸溪，松间沙路净无泥。", author: "苏轼", source: "《浣溪沙》" },
        { text: "竹外桃花三两枝，春江水暖鸭先知。", author: "苏轼", source: "《惠崇春江晚景》" },
        { text: "蒌蒿满地芦芽短，正是河豚欲上时。", author: "苏轼", source: "《惠崇春江晚景》" },
        { text: "燕子飞时，绿水人家绕。", author: "苏轼", source: "《蝶恋花·春景》" },
        { text: "枝上柳绵吹又少，天涯何处无芳草。", author: "苏轼", source: "《蝶恋花·春景》" },
        { text: "春色三分，二分尘土，一分流水。", author: "苏轼", source: "《水龙吟·次韵章质夫杨花词》" },
        { text: "细看来不是杨花，点点是离人泪。", author: "苏轼", source: "《水龙吟·次韵章质夫杨花词》" },
        { text: "一水护田将绿绕，两山排闼送青来。", author: "王安石", source: "《书湖阴先生壁》" },
        { text: "滚滚长江东逝水，浪花淘尽英雄。", author: "杨慎", source: "《临江仙》" },
        { text: "是非成败转头空。", author: "杨慎", source: "《临江仙》" },
        { text: "青山依旧在，几度夕阳红。", author: "杨慎", source: "《临江仙》" },
        { text: "白发渔樵江渚上，惯看秋月春风。", author: "杨慎", source: "《临江仙》" },
        { text: "一壶浊酒喜相逢。", author: "杨慎", source: "《临江仙》" },
        { text: "古今多少事，都付笑谈中。", author: "杨慎", source: "《临江仙》" },
        { text: "问君能有几多愁，恰似一江春水向东流。", author: "李煜", source: "《虞美人》" },
        { text: "雕栏玉砌应犹在，只是朱颜改。", author: "李煜", source: "《虞美人》" },
        { text: "问君能有几多愁，恰似一江春水向东流。", author: "李煜", source: "《虞美人》" },
        { text: "日出江花红胜火，春来江水绿如蓝。", author: "白居易", source: "《忆江南》" },
        { text: "一道残阳铺水中，半江瑟瑟半江红。", author: "白居易", source: "《暮江吟》" },
        { text: "可怜九月初三夜，露似珍珠月似弓。", author: "白居易", source: "《暮江吟》" },
        { text: "孤山寺北贾亭西，水面初平云脚低。", author: "白居易", source: "《钱塘湖春行》" },
        { text: "山重水复疑无路，柳暗花明又一村。", author: "陆游", source: "《游山西村》" },
        { text: "枯藤老树昏鸦，小桥流水人家。", author: "马致远", source: "《天净沙·秋思》" },
        { text: "流水落花春去也，天上人间。", author: "李煜", source: "《浪淘沙》" },
    ],
};

export const COMMON_KEYWORDS = ["月", "花", "酒", "春", "风", "山", "水"];

/**
 * 自动扩充诗词库（同步版本）
 * @param {string} keyword - 关键字
 * @param {Set} usedTexts - 已使用的诗句文本集合
 * @param {string} author - 指定作者（可选）
 * @returns {Array} 新的诗句数组
 */
export function expandPoetryLibrary(keyword, usedTexts, author = null) {
    // 从现有库中筛选未使用的诗句
    const coreVerses = poetryDB[keyword] || [];
    const availableVerses = [];

    for (const verse of coreVerses) {
        if (!usedTexts.has(verse.text) && (!author || verse.author === author)) {
            availableVerses.push(verse);
        }
    }

    return availableVerses;
}

/**
 * 自动扩充诗词库（从网络API获取，去重）
 * @param {string} keyword - 关键字
 * @param {Set} usedTexts - 已使用的诗句文本集合
 * @param {string} author - 指定作者（可选）
 * @returns {Array} 新的诗句数组
 */
export async function expandPoetryLibraryAsync(keyword, usedTexts, author = null) {
    // 先从现有库中筛选未使用的诗句
    const coreVerses = poetryDB[keyword] || [];
    const availableVerses = [];

    for (const verse of coreVerses) {
        if (!usedTexts.has(verse.text) && (!author || verse.author === author)) {
            availableVerses.push(verse);
        }
    }

    // 如果现有库还有未使用的诗句，直接返回
    if (availableVerses.length > 0) {
        return availableVerses;
    }

    // 如果现有库用完了，尝试从网络获取更多诗句
    try {
        // 使用古诗文API获取更多诗句
        const response = await fetch(`https://api.gushi.ci/any.json`);
        if (response.ok) {
            const data = await response.json();
            const newVerse = {
                text: data.content || "",
                author: data.author || "佚名",
                source: data.origin || "《佚名》"
            };

            // 检查是否包含关键字
            if (newVerse.text.includes(keyword) && !usedTexts.has(newVerse.text)) {
                if (!author || newVerse.author.includes(author)) {
                    return [newVerse];
                }
            }
        }
    } catch (error) {
        console.log("无法获取网络诗句，使用备用方案");
    }

    return [];
}

/**
 * 获取指定作者和关键字的所有可用诗句
 * @param {string} keyword - 关键字
 * @param {string} author - 作者
 * @returns {Array} 诗句数组
 */
export function getPoetryByAuthor(keyword, author) {
    const verses = poetryDB[keyword] || [];
    return verses.filter(v => v.author === author);
}

/**
 * 检查诗句是否已使用
 * @param {string} text - 诗句文本
 * @param {Set} usedTexts - 已使用的诗句集合
 * @returns {boolean}
 */
export function isVerseUsed(text, usedTexts) {
    return usedTexts.has(text);
}
