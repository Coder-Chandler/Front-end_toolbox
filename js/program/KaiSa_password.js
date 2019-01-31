
var lower = 'abcdefghijklmnopqrstuvwxyz'
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var code = "Evn Pfib zj 3 yflij ryvru fw Trczwfiezr, slk zk ufvj efk drbv Trczwfiezr jcfn.\n" +
    "Jfdvfev xirulrkvu rk kyv rxv fw 22,slk nrzkvu 5 pvrij svwfiv jvtlizex r xffu afs!\n" +
    "Jfdvfev svtrdv r TVF rk 25,reu uzvu rk 50.\n" +
    "Nyzcv refkyvi svtrdv r TVF rk 50,reu czmvu kf 90 pvrij.\n" +
    "Jfdvfev zj jkzcc jzexcv,nyzcv jfdvfev vcjv xfk driizvu.\n" +
    "Fsrdr ivkzivj rk 55,slk Kildg jkrikj rk 70.\n" +
    "Rsjfclkvcp vmvipfev ze kyzj nficu nfibj srjvu fe kyvzi Kzdv Qfev.\n" +
    "Gvfgcv rifleu pfl dzxyk jvvd kf xf ryvru fw pfl,jfdv dzxyk jvvd kf sv svyzeu pfl.\n" +
    "Slk vmvipfev zj ileezex kyvzi fne IRTV, ze kyvzi fne KZDV.\n" +
    "Ufe’k vemp kyvd fi dftb kyvd.\n" +
    "Kyvp riv ze kyvzi KZDV QFEV, reu pfl riv ze pflij!\n" +
    "Czwv zj rsflk nrzkzex wfi kyv izxyk dfdvek kf rtk.\n" +
    "Jf, IVCRO.\n" +
    "Pfl’iv efk CRKV.\n" +
    "Pfl’iv efk VRICP.\n" +
    "Pfl riv mvip dlty FE KZDV, reu ze pfli KZDV QFEV Uvjkzep jvk lg wfi pfl."

// 定义我们的 log 函数
var log = function() {
    console.log.apply(console, arguments)
}

var isWord = function (wordList, word) {
    var Word = (word.toLowerCase())
    log("单词word小写: ", Word)
    var clearWord = Word.replace(" !@#$%^&*()-_+={}[]|\\:;'<>?,./\"")
    log("清洗单词里面的符号: ", clearWord)
    log("清洗后的单词以及单词类型: ", clearWord, typeof clearWord)
    log("判断单词是否在单词表中: ", wordList.includes(clearWord))
    return wordList.includes(clearWord)
}

var buildCoder = function (shift) {
    var Mydict = {}
    for(var i = 0; i < lower.length; i++) {
        if(i + shift < lower.length) {
            Mydict[lower[i]] = lower[i + shift]
            Mydict[upper[i]] = upper[i + shift]
        }
        else {
            var s = (i + shift) - lower.length
            log(s)
            Mydict[lower[i]] = lower[s]
            Mydict[upper[i]] = upper[s]
        }
    }
    log("26原始字母对于位移后的字母", Mydict)
    return Mydict
}

var applyCoder = function (text, coder) {
    var Rtext = []
    var result = ""
    for (var i = 0; i < text.length; i++) {
        Rtext.push(text[i])
    }
    log("把密文单词分割位list", Rtext)
    for (var j = 0; j < Rtext.length; j++) {
        if(Rtext[j] in coder) {
            Rtext[j] = coder[Rtext[j]]
        }
    }
    log("替换好的密文: ", Rtext)
    // Rtext = Rtext.join(",")
    // log("密文数组整体变string: ", Rtext)
    // Rtext = Rtext.replace(/,/g, "")
    for (var k = 0; k < Rtext.length; k++) {
        result += Rtext[k]
    }
    log("把带逗号的整体string密文转换成连续字符串: ", result)
    return result
}

var applyShift = function (text, shift) {
    log("进入applyShift: ", text, shift)
    return applyCoder(text, buildCoder(shift))
}

var findBestShift = function (words, code) {
    log("findBestShift单词表: ", words)
    log("findBestShift密文: ", code)
    var count_cmp = 0
    var best_shift = 0
    var text_List = code.split(' ')
    log("把密文分割为text_List", text_List)
    for (var i = 0; i < lower.length; i++) {
        log("遍历26个字母，从0遍历到25 i: ", i)
        var count = 0
        for (var j = 0; j < text_List.length; j++) {
            log("遍历密文每一个单词 j: ", text_List[j])
            if(isWord(words, applyShift(text_List[j], i)) === true) {
                log("这是一个单词true: ", text_List[j])
                count += 1
                log("count:  ", count)
            }
        }
        if(count > count_cmp) {
            count_cmp = count
            log("得分count_cmp: ", count_cmp)
            best_shift = i
        }
        log("得分count_cmp记分: ", count_cmp)
        log("最佳位移: ", best_shift)
    }
    return best_shift
}

var decryptStory = function () {
    var bestShift = findBestShift(words, code)
    var result = applyShift(code, bestShift)
    log(result)
    return result
}

var changeStory = function () {
    var story = code
    var num = Math.random()*31+10
    var bestShift = parseInt(num)
    var change = applyShift(story, bestShift)
    log(change)
    return change
}

//解密函数
decryptStory()

//加密函数
changeStory()