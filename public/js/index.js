console.log('working')

const deleteBtn = document.querySelectorAll('.del');

Array.from(deleteBtn).forEach(elem => {
  elem.addEventListener('click', deletePost)
})

async function deletePost(event) {
  const postId = this.parentNode.parentNode.parentNode.dataset.id
  console.log(postId)

  try {
    const response = await fetch('dashboard/deletePost', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postIdFromJSFile: postId,
      })
    })

    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (err) {
    console.log(err)
  }
}