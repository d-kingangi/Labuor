import mssql from 'mssql'
import { createApplication, updateApplication, deleteApplication, getJobApplications, getTalentApplications,  } from '../applications.controller'

// test for createApplication

describe ('Application created successfully', ()=>{

    let res: any

    beforeEach(()=>{
        res={
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('Successfully creates application', async()=>{
        const req = {
            body:{
                jobId: '348734-34793473-438374',
                orgId: '347385-4539583-80535355',
                talentId: '353545-43495835-458347575',
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

        await createApplication(req as any, res)

        expect(res.json).toHaveBeenCalledWith({message: "Application created successfully"})
    })
})