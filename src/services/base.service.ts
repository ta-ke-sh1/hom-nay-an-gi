export default abstract class BaseService {
    constructor() {
    }

    protected async safeRequest(fn: any){
        try {
            return await fn();
        } catch (e: any) {
            return {
                status: false,
                message: e.toString(),
            }
        }
    }
}