const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
role_controller = require('../controllers/role_controller')

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract Bearer token

  if (!token) return res.status(401).json({ error: "Access token required" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ error: "Invalid or expired token" });

      req.user = decoded;
      next(); 
  });
};

/**
 * @swagger
 * /list_modules:
 * 
 */
router.get('/list_modules',authenticateToken, async (req,res)=>{
    try{
        modules = await role_controller.getModules()
        res.json(modules)
    }catch(err){
        res.status(err.status||500).json({error: err.message})
    }
})

router.get('/module/actions/:module',authenticateToken, async (req,res)=>{
    mod = req.params.module
    try{
        actions = await role_controller.getModuleActions(mod)
        res.json(actions)
    }catch(err){
        res.status(err.status||500).json({error: err.message})
    }
})

router.post('/add',authenticateToken, async (req,res)=>{
    const {permissions,role_name} = req.body
    try{
        actions = await role_controller.createRole(role_name,permissions)
        res.json(actions)
    }catch(err){
        res.status(err.status||500).json({error: err.message})
    }
})

router.get('/list_roles',authenticateToken, async (req,res)=>{
    try{
        roles = await role_controller.getRoles()
        res.json(roles)
    }catch(err){
        res.status(err.status||500).json({error: err.message})
    }
})

router.post('/change_status',authenticateToken, async (req,res)=>{
    const {role_id,status} = req.body
    try{
        actions = await role_controller.changeRoleStatus(role_id, status)
        res.json(actions)
    }catch(err){
        res.status(err.status||500).json({error: err.message})
    }
})

router.get('/change_visibility/:rid', authenticateToken, async (req,res)=>{
    const role_id = req.params.rid
    try{
        resp = await role_controller.changeRoleVisibility(role_id)
        res.json(resp)
    }catch(err){
        res.status(err.status||500).json({error: err.message})
    }
})

router.post('/modify_permissions', authenticateToken, async (req,res)=>{
    const {role_id, permissionIds} = req.body
    try{
        resp = await role_controller.modifyRolePermissions(role_id,permissionIds)
        res.json(resp)
    }catch(err){
        res.status(err.status||500).json({error: err.message})
    }
})

router.get('/get_role_permission_ids/:rid',authenticateToken,async (req,res)=>{
    const role_id = req.params.rid
    try{
        resp = await role_controller.getRolePermissionIds(role_id)
        res.json(resp)
    }catch(err){
        res.status(err.status||500).json({error: err.message})
    }
})

router.get('/get_role_name/:rid',authenticateToken,async (req,res)=>{
    const role_id = req.params.rid
    try{
        resp = await role_controller.getRoleNameById(role_id)
        res.json(resp)
    }catch(err){
        res.status(err.status||500).json({error: err.message})
    }
})

router.get('/get_role_permission_names/:rid',authenticateToken,async (req,res)=>{
    const role_id = req.params.rid
    try{
        resp = await role_controller.getRolePermissionNames(role_id)
        res.json(resp)
    }catch(err){
        res.status(err.status||500).json({error: err.message})
    }
})

router.get('/get_roles_by_modules', async (req,res)=>{
    try{
        resp = await role_controller.getRolesByModules()
        res.json(resp)
    }catch(err){
        res.status(err.status||500).json({error: err.message})
    }
})

router.get('/users/list', authenticateToken, async (req,res)=>{
    try{
        resp = await role_controller.getVisibleUsers()
        res.json(resp)
    }catch(err){
        res.status(err.status||500).json({error: err.message})
    }
})

router.post('/users/create',authenticateToken, async (req,res)=>{
    const {first_name,last_name, user_name, email, phone, password, role_id} = req.body
    try{
        resp = await role_controller.createRoleUser(first_name,last_name, user_name, email, phone, password, role_id);
        res.json(resp)
    }catch(err){
        res.status(err.status||500).json({error:err.message})
    }
})

router.post('/users/change_status',authenticateToken, async (req,res)=>{
    const {user_id,status} = req.body
    try{
        resp = await role_controller.changeUserStatus(user_id, status)
        res.json(resp)
    }catch(err){
        res.status(err.status||500).json({error: err.message})
    }
})

router.delete('/users/delete/:uid', authenticateToken, async (req,res) =>{
    const uid = req.params.uid
    try{
        resp = await role_controller.changeUserVisibility(uid);
        res.json(resp)
    }catch(err){
        res.status(err.status||500).json({error: err.message})
    }
})

router.get('/users/get_user_details/:uid',authenticateToken, async (req,res)=>{
    const uid = req.params.uid
    try{
        resp = await role_controller.getUserById(uid);
        res.json(resp)
    }catch(err){
        res.status(err.status||500).json({error: err.message})
    }
})

router.patch('/users/update/:uid',authenticateToken,async (req,res)=>{
    const uid = req.params.uid
    const updates = req.body
    if (!Object.keys(updates).length) {
        return res.status(400).json({ error: 'No fields provided for update' });
      }
    try{
        resp = await role_controller.updateUser(uid,updates);
        res.json(resp)
    }catch(err){
        res.status(err.status||500).json({error: err.message})
    }
})

module.exports = router