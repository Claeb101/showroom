import { db } from '@/lib/db'
import { NextApiRequest } from 'next'
import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const events = await db.stockEvent.findMany({
    where: {
      delta: 0
    },
    include: {
      product: true
    }
  })
  if (false) {
    await Promise.all(events.map(async (e) => {
      if (!e.product.stock || e.product.stock < 1) {
        console.log("AHH", e)
      }

      try {
        const x = await db.stockEvent.update({
          where: {
            id: e.id,
          },
          data: {
            delta: e.product.stock!
          }
        })
      } catch {
        console.log("ERRR", e)
      }
    }))
  }

  return NextResponse.json({
    events
  })
}