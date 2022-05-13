export const cleanPullRequest = (event: any) => {
  if (
    event.action === 'open' ||
    event.action === 'reopened' ||
    event.action === 'closed'
  ) {
    const pullEvent = {
      pull_id: event.pull_request.id,
      title: event.pull_request.title,
      status: event.action,
      // sender: event.sender.login,
      // senderId: event.sender.id,
      // repoUrl: event.repository.html_url,
      number: event.number,
      pull_url: event.pull_request.url,
      comment: event.pull_request.body,
    };

    return pullEvent;
  }
  
  return null;
};
