import { ExecutionContext, UnauthorizedException } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"


export class JwtAuthGuard extends AuthGuard('jwt'){

     canActivate(context: ExecutionContext){
          return super.canActivate(context)
     }

     handleRequest(err: any,user: any) {
         if(err || !user){
          throw err || new UnauthorizedException();
         }
         return user
     }
}


/* 
If i ever need to use this file , its a guard that secures the API with a web token. To use it
, simply add @UseGuards(JwtAuthGuard) above any API route you want to protect, like this:
@Get()
@UseGuards(JwtAuthGuard)
Then, make sure to pass the token when making requests, and you're all set!
ps: i didnt use it yet  */