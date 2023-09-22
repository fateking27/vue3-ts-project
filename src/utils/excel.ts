import * as xlsx from 'xlsx'

export const exportExcel = (columns: any, tableData: any) => {
    const theadTitle = columns
        .filter((item: any) => (item.title != '操作' || item.key != 'action'))
        .map((item: any) => item.title)

    const theadKey = columns
        .filter((item: any) => (item.title != '操作' || item.key != 'action'))
        .map((item: any) => item.key)

    const tbodyData = tableData.map((item: any) => {
        return theadKey.map((key: string) => item[key])
    })

    console.log(tbodyData)

    const worksheet = xlsx.utils.aoa_to_sheet([
        theadTitle,
        ...tbodyData
    ]);

    const workbook = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(workbook, worksheet, '表一');
    xlsx.writeFile(workbook, '用户信息表.xlsx');
}