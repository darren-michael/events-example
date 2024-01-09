export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const route = searchParams.get('route')
  const res = await fetch(`${process.env.SERVER_API_URL}/api${route}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-Key': process.env.SERVER_API_KEY!,
    },
  })
  const data = await res.json()
 
  return Response.json(data)
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const route = searchParams.get('route')
  const res = await fetch(`${process.env.SERVER_API_URL}/api${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-Key': process.env.SERVER_API_KEY!,
    },
    body: JSON.stringify(await request.json()),
  })
 
  const data = await res.json()
 
  return Response.json(data)
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url)
  const route = searchParams.get('route')
  const res = await fetch(`${process.env.SERVER_API_URL}/api${route}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-api-Key': process.env.SERVER_API_KEY!,
    },
    body: JSON.stringify(await request.json()),
  })
 
  const data = await res.json()
 
  return Response.json(data)
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const route = searchParams.get('route')
  const res = await fetch(`${process.env.SERVER_API_URL}/api${route}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-api-Key': process.env.SERVER_API_KEY!,
    },
  })
 
  const data = await res.json()
 
  return Response.json(data)
}
