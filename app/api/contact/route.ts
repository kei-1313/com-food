import nodemailer from "nodemailer";

import { NextResponse, NextRequest } from 'next/server'

export async function POST(req: NextRequest){
  if (req.method === "POST") {
    try {
      const body = await req.json()

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.GMAILUSER,
          pass: process.env.GMAILPASSWORD,
        },
      });

      //管理者が受け取るメール
      const toHostMailData = {
        from: body.email,
        to:"pappitson0121@gmail.com",
        subject: body.subject,
        text: body.content,
        html: `
          <p>名前:${body.name}</p>
          <p>メールアドレス:${body.email}</p>
          <p>お問い合わせタイトル:${body.subject}</p>
          <p>お問い合わせ内容:${body.content}</p>
        `
      }

      //ユーザーが受け取るメール
      const toUserMailData = {
        from: "pappitson0121@gmail.com",
        to: body.email,
        subject: "お問い合わせ完了のお知らせ",
        text: body.content,
        html: `
          <p>${body.name}様</p>
          <p>この度はお問い合わせをいただきありがとうございます。</p>
          <p>2~3日営業日で返信させていただきます</p>
        `
      }

      transporter.sendMail(toHostMailData);
      transporter.sendMail(toUserMailData);

      return NextResponse.json({
        status: 200,
        message: "メールが送信されました"
      });
    } catch(error) {
      console.error(error);
      return NextResponse.json({
        status: 500,
        error: "メールの送信中にエラーが発生しました。"
      });
    }
  } else {
    return NextResponse.json({
      status: 405,
      error: "POSTメソッドを使用してください。"
    });
  }


}

