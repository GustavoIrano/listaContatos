export class UserUtil {
    static get(): any {
        const data = localStorage.getItem('contactList.user');
        if (!data) return null;
        return JSON.parse(data);
    }

    static set(data) {
        localStorage.setItem('contactList.user', JSON.stringify(data));
    }

    static clear() {
        localStorage.removeItem('contactList.user');
    }
}