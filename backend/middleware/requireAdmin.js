import jwt from 'jsonwebtoken'
export function requireAdmin(req, res, next) {
    const header = req.headers.authorization || ""
    const [type , token] = header.split(' ');
    if(type !== "Bearer" || !token){
        return res.status(401).json({error: "Missing token"})
    }
    try{
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        return next();
    }catch{
        return res.status(401).json({error: "Invalid token"})
    }
}