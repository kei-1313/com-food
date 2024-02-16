import { NextResponse, NextRequest } from 'next/server'

export async function GET(req:NextRequest){
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query')
  const location = "43.072372229883534%2C141.3494175181069"
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
  const radius = 1000; // 検索範囲（メートル）
  const type = "restaurant"; // 検索タイプ
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${location}&query=${query}&radius=${radius}&type=${type}&key=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(JSON.stringify(data.results[0], null, 4));
    
    return NextResponse.json(data)
  } catch (error) {
      return NextResponse.json({
        status: 500,
        message: "サーバの応答がありません"
      });
  }
}