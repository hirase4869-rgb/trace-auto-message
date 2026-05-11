require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});


// 상품 + 옵션별 메일 템플릿
const templates = {

    '바다거북스프': {

        '오리지널': {

            subject: '[TRACE] 바다거북스프 오리지널 다운로드 안내',

            text: `
안녕하세요.

바다거북스프 오리지널 다운로드 안내드립니다.

[다운로드 링크]
https://링크1

[비밀번호]
1111

메일이 도착하지 않았다면
TRACE 네이버톡톡 문의로 연락 부탁드립니다.
`
        },

        '오컬트': {

            subject: '[TRACE] 바다거북스프 오컬트 다운로드 안내',

            text: `
안녕하세요.

바다거북스프 오컬트 다운로드 안내드립니다.

[다운로드 링크]
https://링크2

[비밀번호]
2222

메일이 도착하지 않았다면
TRACE 네이버톡톡 문의로 연락 부탁드립니다.
`
        }
    }
};


// 메일 테스트
app.get('/mail-test', async (req, res) => {

    try {

        const buyerId = 'jsin369';

        const email = buyerId + '@naver.com';

        const template =
        templates['바다거북스프']['오컬트'];

        await transporter.sendMail({

            from: process.env.GMAIL_USER,

            to: email,

            subject: template.subject,

            text: template.text
        });

        res.send('메일 발송 성공');

    } catch (err) {

        console.log(err);

        res.send('메일 실패');
    }
});


app.get('/', (req, res) => {
    res.send('TRACE AUTO SERVER RUNNING');
});


app.listen(3000, () => {
    console.log('SERVER START');
});
