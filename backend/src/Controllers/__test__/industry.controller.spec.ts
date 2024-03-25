
import mssql from 'mssql'
import { createIndustry, getAllIndustries, getOneIndustry, updateIndustry, deleteIndustry } from '../industry.controller'

describe('Industry created successfully', ()=>{

  let res: any

  beforeEach(()=>{
    res={
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
  })

  it('Successfully creates industry', async ()=>{
    const req = {
      body:{
        industryName: 'Hosting'
      }
    }

    const mockedInput = jest.fn().mockReturnThis() 

    const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

    const mockedRequest ={
      input: mockedInput,
      execute: mockedExecute
    }

    const mockedPool ={
      request: jest.fn().mockReturnValue(mockedRequest)
    }

    jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

    await createIndustry(req as any, res)

    expect(res.json).toHaveBeenCalledWith({message: "Industry created successfully"})
  })
})

// test for getAllIndustries

describe('Gets all Industries', ()=>{

  let res: any
  let req: any

  beforeEach(()=>{
    req={
        body:{}
    }
    res={
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
  })

  it('Successfully gets all industries', async()=>{
    const mockedResult= [
      {industryId: '348734-34793473-438374', industryName: 'Hosting'},
      {industryId: '348734-34793473-438374', industryName: 'Cloud'},
    ]

    const mockedInput = jest.fn().mockReturnThis() 

    const mockedExecute = jest.fn().mockResolvedValue({ recordset: mockedResult })

    const mockedRequest ={
      input: mockedInput,
      execute: mockedExecute
    }

    const mockedPool ={
      request: jest.fn().mockReturnValue(mockedRequest)
    }

    jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

    await getAllIndustries(req as any, res)

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ users: mockedResult });
  })
})

// test for getOneIndustry

describe('Gets one industry', ()=>{

  let req: any
  let res: any

  beforeEach(()=>{
    req = {
        params: {
            id: '353545-43495835-458347575', 
        },
    };
    res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
    };
  })

  it('Successfully gets one industry', async()=>{
    const mockedResult = [
      {industryId: '348734-34793473-438374', industryName: 'Hosting'},
    ]

    const mockedInput = jest.fn().mockReturnThis()

    const mockedExecute = jest.fn().mockResolvedValue({ recordset: mockedResult [0] })

    const mockedRequest ={
      input: mockedInput,
      execute: mockedExecute
    }

    const mockedPool ={
      request: jest.fn().mockReturnValue(mockedRequest)
    }

    jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

    await getOneIndustry(req as any, res)

    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.json).toHaveBeenCalledWith({ error: "An error occurred while fetching industry." });
  })
})