<template>
    <div class="msg">
        <Layout :style="{background: '#fff', minHeight: '700px' }">
            <Sider hide-trigger>
                <div>
                    <Menu active-name="0" theme="light" class="menu">
                        <MenuItem 
                            v-for="(item,index) in menuList" 
                            :key="`menu-${index}`"
                            :name="index">
                            <Avatar :src="item.photo" size="large" />
                            <span>{{item.menuName}}</span>
                        </MenuItem>
                    </Menu>
                </div>
            </Sider>
            <Content class="content">
               <div class="dialogue">
                    <List>
                        <ListItemMeta class="dialogue-item" avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" 
                            title="This is title" description="This is description, this is description." />
                        <ListItemMeta class="dialogue-item" avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" 
                            title="This is title" description="This is description, this is description." />
                        <ListItemMeta class="dialogue-item" avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar" 
                            title="This is title" description="This is description, this is description." />
                    </List>
                </div>
                <div class="inputBox">
                    <Input v-model="msgInfo" type="textarea" :rows="4" style="margin-bottom: 12px" placeholder="请输入内容"/>
                    <span style="margin-right: 76%; color: #969696">Enter 直接发送</span>
                    <Button type="success" ghost shape="circle">保存</Button>
                </div>
            </Content>
        </Layout>
    </div>
</template>

<script>
export default {
    name: 'msg',
    data () {
        return {
            menuList: [
                {menuName:'小惠',photo:``},
                {menuName:'小张',photo:``}
            ],
            msgInfo: ''
        }
    }
}
</script>

<style lang="less" scoped>
.msg{
    width: 55%;
    margin: 25px auto 0;
    .menu {
        height: 700px;
        overflow-x: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar { /*滚动条整体样式*/
            width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
        }
        &::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
            border-radius: 10px;
            box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: #dcdee2;
        }
    }
    .content {
        margin: 0 90px; 
        height: 700px;
        overflow: hidden;
        .dialogue{
            height: 80%;
            overflow-y: scroll;
            &::-webkit-scrollbar { /*滚动条整体样式*/
                width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
            }
            &::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
                border-radius: 10px;
                box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: #dcdee2;
            }
            .dialogue-item{
                padding: 25px 0 0;
            }
        }
        .inputBox{
            height: 20%;
        }
    }
}
</style>