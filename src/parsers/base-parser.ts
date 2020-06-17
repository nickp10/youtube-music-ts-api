export default class BaseParser {
    traverse(obj: any, ...path: string[]): any {
        if (obj) {
            if (Array.isArray(path) && path.length > 0)  {
                return this.traverse(obj[path[0]], ...path.slice(1));
            }
            return obj;
        }
        return undefined;
    }
}
