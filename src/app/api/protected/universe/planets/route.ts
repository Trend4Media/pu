import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const type = searchParams.get('type');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    if (type) {
      where.type = type;
    }
    if (search) {
      where.name = {
        contains: search,
        mode: 'insensitive',
      };
    }

    const [planets, total] = await Promise.all([
      prisma.planet.findMany({
        where,
        skip,
        take: limit,
        include: {
          colonies: {
            include: {
              player: {
                select: {
                  name: true,
                  race: true,
                }
              }
            }
          },
          fleets: {
            include: {
              player: {
                select: {
                  name: true,
                }
              }
            }
          }
        },
        orderBy: {
          name: 'asc',
        }
      }),
      prisma.planet.count({ where })
    ]);

    return NextResponse.json({
      planets,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      }
    });
  } catch (error) {
    console.error('Get planets error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}