<template>
    <List item-layout="vertical">
        <ListItem v-for="(item, index) in data" :key="index">
            <ListItemMeta :avatar="item.avatar" :title="item.title" :description="item.description" />
            {{ item.content }}
            <template slot="action">
                <li>
                    <Icon type="ios-star-outline" /> 123
                </li>
                <li>
                    <Icon type="ios-thumbs-up-outline" /> 234
                </li>
                <li>
                    <Icon type="ios-chatbubbles-outline" /> 345
                </li>
            </template>
            <template slot="extra">
                <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large" style="width: 280px">
            </template>
        </ListItem>
    </List>
</template>

<script scope>
export default {
    name: 'debateList',
    data() {
        return {
            data: [
                {
                    title: '这是一个辩题',
                    description: '这是一个辩题这是一个辩题',
                    avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                    content: '这是一个辩题这是一个辩题这是一个辩题这是一个辩题这是一个辩题这是一个辩题这是一个辩题'
                }
            ]
        }
    },
}
</script>

<style scoped>

</style>
