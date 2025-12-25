const useAuth=():boolean=>{
    return !!localStorage.getItem('authToken');
}
export default useAuth;