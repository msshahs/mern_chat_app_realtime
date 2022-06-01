module.exports = (tfunc)=>(req,res,next)=>{
    Promise.resolve(tfunc(req,res,next)).catch(next);
};
