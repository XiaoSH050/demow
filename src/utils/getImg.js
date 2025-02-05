// 获取assets静态资源
export const getIcon = (name) => {
    // console.log(name);
    return new URL(`../assets/icon/${name}.png`, import.meta.url).href;
};