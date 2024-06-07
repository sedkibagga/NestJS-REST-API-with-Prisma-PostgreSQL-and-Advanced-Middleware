import { Controller, Get, Post, Body, Patch, Param, Delete , Query , Ip } from '@nestjs/common';
import { EmployeesService } from './employees.service';
// import { CreateEmployeeDto } from './dto/create-employee.dto';
// import { UpdateEmployeeDto } from './dto/update-employee.dto';allakhater hatina model employee fi schema.prisma zeyed enou nestaaml el dto kima men loul fil users
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler'; //The @Throttle decorator allows you to apply specific rate limiting rules to individual endpoints or controllers. This is useful when you need different rate limits for different parts of your application.
//The @SkipThrottle decorator allows you to exempt specific routes or controllers from the global rate limiting rules. This is useful when you have certain endpoints that should not be rate-limited, such as health checks or public resources.
import { MyLoggerService } from 'src/my-logger/my-logger.service';
@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  private readonly logger = new MyLoggerService(EmployeesController.name); //EmployeesController.name = 'EmployeesController'
  constructor(private readonly employeesService: EmployeesService) {}
 
  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }
  
  @SkipThrottle({default:false})
  @Get()
  findAll(@Ip() ip : string , @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    this.logger.log(`Request for ALL Employees: ${ip}`)
    return this.employeesService.findAll(role);
  }
  @Throttle({short : {ttl : 1000 , limit: 1}})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
