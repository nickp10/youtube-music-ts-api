export default class BaseParser {
    traverse(obj: any, ...path: string[]): any {
        if (obj) {
            if (Array.isArray(path) && path.length > 0)  {
                if (Array.isArray(obj) && path[0] === "*") {
                    for (let i = 0; i < obj.length; i++) {
                        const subObj = this.traverse(obj[i], ...path.slice(1));
                        if (subObj) {
                            return subObj;
                        }
                    }
                    return undefined;
                } else {
                    return this.traverse(obj[path[0]], ...path.slice(1));
                }
            }
            return obj;
        }
        return undefined;
    }
}
