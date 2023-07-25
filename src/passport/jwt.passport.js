import passport from "passport";
import  jwt  from "passport-jwt";



const JWTStrategy = jwt.Strategy;
const ExtractorJWT = jwt.ExtractJwt;


export const initializePassport = () => {
    passport.use('jwt', new JWTStrategy(
        {
            jwtFromRequest: ExtractorJWT.fromExtractors([cookieExtractor]),
            secretOrKey: 'coderSecret',
        }, 
        async(jwt_payload, done)=>{
        try{
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        } 
    } 
    )
    )
};



const cookieExtractor = (req) => {
    let token = null
    if( req && req.cookies ) {
        token = req.cookies['coderCookie'];
    }
    return token
}