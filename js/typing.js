Node.prototype.nextNode = function() {
    var cur = this;
    while (cur = cur.nextSibling) {
        if (cur.nodeType === 1 && !cur.classList.contains('fakeContent')) {
            return cur;
        }
    }
    return null;
};

Node.prototype.firstNode = function() {
    var cur = this.firstChild;
    if (cur.nodeType === 1) {
        return cur;
    }
    else {
        return cur.nextNode();
    }
};

Element.prototype.typeAndDelete = function(options) {
    options = options || {};

    var contentList = this,
        curContent = contentList.getElementsByClassName('active')[0] || contentList.firstNode();

    // 애니메이션 시간
    var selectTimePerWord = options.selectTimePerWord || 50,
        typeTimePerWord = options.typeTimePerWord || 200,
        delayAfterSelect = options.delayAfterSelect || 500,
        delayAfterDelete = options.delayAfterDelete || 1000,
        delayBetweenWords = options.delayBetweenWords || 150;

    // Fake Content 생성
    var fakeContent = contentList.getElementsByClassName('fakeContent')[0];
    if (!fakeContent) {
        fakeContent = document.createElement('span');
        fakeContent.classList.add('fakeContent');
        fakeContent.classList.add('selecting');
        contentList.appendChild(fakeContent);
    }

    // 글자 선택
    var selecting = function() {
        // Fake Content 랑 글자 같게 하기
        fakeContent.innerHTML = curContent.innerHTML;

        // 글자 선택 시작
        var selectingAnimation = setInterval(function() {
            fakeContent.innerHTML = fakeContent.innerHTML.substring(0, fakeContent.innerHTML.length - 1);
            if (fakeContent.innerHTML.length <= 0) {
                clearInterval(selectingAnimation);

                deleting();
            }
        }, selectTimePerWord);
    };

    // 글자 삭제
    var deleting = function() {
        // 딜레이, 삭제, 다음 글자로 바꾸기
        setTimeout(function() {
            fakeContent.classList.remove('selecting');
            fakeContent.classList.add('typing');
            curContent.classList.remove('active');

            curContent = curContent.nextNode() ? curContent.nextNode() : contentList.firstNode();
            curContent.classList.add('typing');
            curContent.classList.add('active');
        }, delayAfterSelect);

        // 삭제, 다음 글자 시작
        setTimeout(function() {
            typing();
        }, delayAfterDelete);
    };

    // 타이핑
    var typing = function() {
        // Fake Content 삭제
        fakeContent.innerHTML = "";

        // 타이핑 시작
        var typingAnimation = setInterval(function() {
            fakeContent.innerHTML = curContent.innerHTML.substring(0, fakeContent.innerHTML.length + 1);

            // 타이핑 정지
            if (fakeContent.innerHTML.length >= curContent.innerHTML.length) {
                fakeContent.classList.remove('typing');
                clearInterval(typingAnimation);

                // 글자 간의 딜레이
                setTimeout(function() {
                    curContent.classList.remove('typing');
                    fakeContent.classList.add('selecting');
                    selecting();
                }, delayBetweenWords);
            }
        }, typeTimePerWord);
    };

    return selecting();
};

document.getElementById('content').typeAndDelete({
  delayAfterDelete: 500
});