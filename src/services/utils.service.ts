import dayjs from "dayjs";

export class UtilsService {
    public static log_timestamp(message: string) {
        const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
        const msg = `[${timestamp}] ${message}`
        console.log(msg);
        return msg;
    }
}