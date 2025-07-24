import sys
import os

def remove_token_from_file(filepath, token):
    if not os.path.exists(filepath):
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if token in content:
        new_content = content.replace(token, '')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Removed token from {filepath}")
    else:
        print(f"Token not found in {filepath}")

# 커밋 기록에서 제거할 토큰
# 이전에 package.json에서 확인된 실제 토큰 값입니다.
SECRET_TOKEN = "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"

# 이 스크립트는 Git filter-branch에 의해 각 커밋에서 실행됩니다.
# GIT_INDEX_FILE 환경 변수를 사용하여 현재 커밋의 인덱스 파일 경로를 가져옵니다.
# 하지만 filter-branch는 --tree-filter에서 실제 파일을 수정하므로, 인덱스 파일은 직접 건드리지 않습니다.

# 실제 파일 경로
package_json_path = "package.json"
remove_token_from_file(package_json_path, SECRET_TOKEN)

# 추가적으로, 토큰이 포함될 수 있는 다른 파일이 있다면 여기에 추가할 수 있습니다.
# 예: remove_token_from_file("server.py", SECRET_TOKEN) 