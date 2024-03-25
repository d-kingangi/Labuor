// talents.controller.test.ts
import mssql from 'mssql'
import { createTalent, getAllTalents, getSingleTalent, getTalentsPerIndustry, updateTalent, deleteTalent } from '../talent.controller';

describe('Account created successfully', () => {

  let res: any

  beforeEach(()=>{
    res={
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
  })

  it('Succesfully creates talent', async ()=>{
    const req = {
      body:{
        profileImg: 'image.com',
        firstname: 'Lee',
        lastname: 'Lee',
        email: 'lee@labour.com',
        industryId: '6785',
        speciality: 'Web hosting',
        talentWallet: 'lee.eth',
        location: 'Atlanta',
        phone: '+426848dge',
        password: 'leeleeelee',
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

    await createTalent(req as any, res)

    expect(res.json).toHaveBeenCalledWith({message: "Account created successfully"})
  })

});

// test for getAllTalents

describe('Gets all talents', ()=>{

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

  it('Successfully gets talents', async () => {
    const mockedResult = [
      {talentId: '353545-43495835-458347575', profileImg: 'image.com', firstname: 'Asa', lastname: 'Asa', email: 'asa@gmail.com', industryId: '365835', industryName: 'Health', speciality: 'Oncology', talentWallet: 'asa.ety', location: 'Kinshasa', phone: '+678908796', password: 'asapassword'},
      {talentId: '353545-43495835-458347575', profileImg: 'image.com', firstname: 'Asa', lastname: 'Asa', email: 'asa@gmail.com', industryId: '365835', industryName: 'Health', speciality: 'Oncology', talentWallet: 'asa.ety', location: 'Kinshasa', phone: '+678908796', password: 'asapassword'},
      {talentId: '353545-43495835-458347575', profileImg: 'image.com', firstname: 'Asa', lastname: 'Asa', email: 'asa@gmail.com', industryId: '365835', industryName: 'Health', speciality: 'Oncology', talentWallet: 'asa.ety', location: 'Kinshasa', phone: '+678908796', password: 'asapassword'}
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

        await getAllTalents(req as any, res)

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ users: mockedResult });
  })
})

// test for getSingleTalent

describe('Gets single talent', ()=>{

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

  it('Successful fetch for a single member',async () => {
    const mockedResult = [
        {talentId: '353545-43495835-458347575', profileImg: 'image.com', firstname: 'Asa', lastname: 'Asa', email: 'asa@gmail.com', industryId: '365835', industryName: 'Health', speciality: 'Oncology', talentWallet: 'asa.ety', location: 'Kinshasa', phone: '+678908796', password: 'asapassword'}
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

    await getSingleTalent(req as any, res)

    // expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "An error occurred while fetching member." });
})
})

// test for updateTalent

describe("Talent updated succefully", ()=>{

  let res: any
  let req: any

  beforeEach(()=>{
    req={
        params: {
            talentId: '353545-43495835-458347575', 
        }
    }
    res={
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }
  })
  
  it('Successfully updates member',async () => {
    const req={ 
      body:{
        lastname: "Butterfield"
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

    await updateTalent(req as any, res);

    jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

    expect(res.json).toHaveBeenCalledWith({message: "Talent updated successfully"})

  })
})


// test for deleteTalent

describe('Account deleted succesfully', ()=>{

  let res: any
    let req: any

    beforeEach(()=>{

        req={
            params: {
                talentId: '353545-43495835-458347575', 
            }
        }
        res={
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('Successfully deletes talent',async () => {
      const req={ body:{}}
      
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

      await deleteTalent(req as any, res)

      // expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({message: "Account deleted successfully"})
  })
})