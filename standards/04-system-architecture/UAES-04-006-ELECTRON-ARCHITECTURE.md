# UAES-04-006 — Electron Architecture & Security Boundary Standard

**Standard ID:** UAES-04-006  
**Version:** 1.0.0  
**Status:** DRAFT

## 1. Purpose

规范 Uter Electron 桌面端的进程边界、IPC 通信、权限控制、数据访问、系统能力调用、更新和资源生命周期。

## 2. Process architecture

Electron 应明确区分：

1. Main Process；
2. Renderer Process；
3. Preload Script；
4. Utility Process（仅在确有需要时）；
5. 外部系统服务。

职责：

| Component       | Responsibility        |
| --------------- | --------------------- |
| Main            | 窗口、应用生命周期、系统能力、受控文件访问 |
| Renderer        | 用户界面和交互               |
| Preload         | 安全暴露有限的 IPC API       |
| Utility Process | 隔离执行特定计算或任务           |

## 3. Security boundary

- UAES-EL-001：Renderer 不得获得 Node.js 完整访问权限。
- UAES-EL-002：必须启用 `contextIsolation`。
- UAES-EL-003：必须禁用不必要的 `nodeIntegration`。
- UAES-EL-004：不得将任意 IPC 通道暴露给 Renderer。
- UAES-EL-005：Preload 必须只暴露经过审查的最小 API。
- UAES-EL-006：所有 IPC 参数必须进行类型和内容校验。
- UAES-EL-007：敏感系统操作必须在 Main Process 中进行权限控制。
- UAES-EL-008：禁止通过 IPC 执行未经限制的任意命令。
- UAES-EL-009：不得将密钥或敏感凭据写入 Renderer 可访问的存储。
- UAES-EL-010：禁止不受信任页面访问本地系统能力。

## 4. IPC contract

IPC 必须采用明确契约：

```
type IPCRequest<T> = {
  requestId: string;
  payload: T;
};

type IPCResponse<T> =
  | {
      requestId: string;
      ok: true;
      data: T;
    }
  | {
      requestId: string;
      ok: false;
      error: {
        code: string;
        message: string;
      };
    };
```

规则：

- UAES-EL-011：IPC 通道必须有唯一名称和用途。
- UAES-EL-012：每个通道必须有输入和输出类型。
- UAES-EL-013：必须验证发送方身份和来源。
- UAES-EL-014：必须限制可调用操作。
- UAES-EL-015：必须处理超时、异常和窗口关闭。
- UAES-EL-016：不得把任意函数或对象直接暴露到 Renderer。

## 5. Navigation and external content

- UAES-EL-017：外部链接必须使用安全的外部打开机制。
- UAES-EL-018：不得允许未经授权的远程内容加载本地权限。
- UAES-EL-019：窗口导航必须有来源限制。
- UAES-EL-020：新窗口创建必须经过策略检查。
- UAES-EL-021：禁止通过不受信任 URL 加载拥有本地系统权限的页面。

## 6. File system and operating system access

- UAES-EL-022：文件系统访问必须经过明确授权。
- UAES-EL-023：必须限制允许访问的目录和文件类型。
- UAES-EL-024：路径必须进行规范化和越界检查。
- UAES-EL-025：禁止将用户输入直接拼接为系统命令。
- UAES-EL-026：需要执行外部程序时必须使用参数化调用并限制可执行文件。
- UAES-EL-027：敏感文件操作必须具备明确的错误和恢复处理。

## 7. Persistence and credentials

- UAES-EL-028：持久化数据必须区分普通设置与敏感凭据。
- UAES-EL-029：敏感凭据必须使用适当的操作系统安全存储能力。
- UAES-EL-030：禁止以明文形式持久化访问令牌、私钥或长期凭据。
- UAES-EL-031：凭据读取和写入必须有清晰的生命周期。
- UAES-EL-032：日志不得输出完整凭据。

## 8. Lifecycle and updates

- UAES-EL-033：应用启动、退出和异常关闭必须有明确生命周期处理。
- UAES-EL-034：IPC 监听器和事件监听器必须正确清理。
- UAES-EL-035：更新流程必须验证下载来源和更新包完整性。
- UAES-EL-036：更新失败必须有恢复机制。
- UAES-EL-037：不得在未经验证的情况下执行更新包。

## 9. Acceptance criteria

- Renderer 与 Main 权限隔离；
- Preload API 最小化；
- IPC 有完整契约和输入校验；
- 外部导航受到限制；
- 文件系统访问受控；
- 敏感凭据不以明文存储；
- 资源监听器能正确清理；
- 更新过程可验证和恢复。
